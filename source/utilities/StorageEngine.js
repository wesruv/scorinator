import DbProxy       from "./DbProxy";
import Rx         from "rx";

var stores = {};

/*
 * Private helpers
 */
function different(item1, item2) {
  var areDiff = item1 !== item2;

  if (areDiff &&
      item1 &&
      item2 &&
      typeof item1 === "object" &&
      typeof item2 === "object") {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    if (keys1.length === keys2.length) {
      let areDiffIsh = false;

      keys1.forEach((key, index) => {
        if (key === keys2[index]) {
          if (item1[key] !== item2[key]) {
            areDiffIsh = true;
          }
        } else {
          areDiffIsh = true;
        }
      });

      return areDiffIsh;
    }
  }

  return areDiff;
}

function deleteItemFromState(state, id) {
  if (itemExists(id, state)) {
    let updatedState = Object.assign({}, state);// eslint-disable-line prefer-const

    delete updatedState[id];

    return updatedState;
  }

  return state;
}

function prepareItemForMerge(data, id) {
  var item;

  if (id) {
    item = {
      [id]: Object.assign({}, data, { id })
    };
  } else if (data.id) {
    item = {
      [data.id]: data
    };
  } else {
    throw new Error("item needs an id to be merge-able");
  }

  return item;
}

function mergeItem(state, updateData, id) {
  if (different(state[id], updateData)) {
    return Object.assign({}, state, updateData);
  }

  return state;
}

function mergeAll(state, updates) {
  if (different(state, updates)) {
    return Object.assign({}, state, updates);
  }

  return state;
}

function itemExists(id, state) {
  return !!(state[id]);
}

/*
 * More sensitive private helpers
 */
function updateStoreState(outerStore, newState) {
  if (newState !== outerStore.items) {
    outerStore.items = newState;
    outerStore.subject.onNext(newState);
  }
}

function sendInnerStoreAction(outerStore, action, ...args) {
  const source = Rx.Observable.create((o) => {
    o.onNext({
      action,
      args
    });
  });
  const store = stores[outerStore.storeName];

  source.subscribe(store.innerStore.outerObserver);
}

/*
 * State Store CRUD functions
 */
const stateCUDHelpers = {
  create(data, id) {
    const state = this.items;
    const item = prepareItemForMerge(data, id);
    const merged = mergeItem(state, item, id);

    sendInnerStoreAction(this, "create", data, id);
    updateStoreState(this, merged);
  },

  requestFullState() {
    sendInnerStoreAction(this, "readAll");
  },

  update(data, id) {
    const state = this.items;

    if (state[id] !== undefined) {
      const prePreppedItem = Object.assign(this.items[id], data);

      const item = prepareItemForMerge(prePreppedItem, id);
      const merged = mergeItem(state, item, id);

      sendInnerStoreAction(this, "update", data, id);
      updateStoreState(this, merged);
    } else {
      console.log(`attempted to update item "${ id }", which doesn't exist`);
    }
  },

  delete(id) {
    const state = this.items;
    const updatedState = deleteItemFromState(state, id);

    if (different(state, updatedState)) {
      sendInnerStoreAction(this, "delete", id);
      updateStoreState(this, updatedState);
    }
  },

  // batchCreateUpdateDelete format:
  // [
  //   ["update", "someUniqueId", { "title": "new title" }, ],
  //   ["delete", "someDoomedItemId"]
  // ]
  batchCreateUpdateDelete(updates) {
    const state = this.items;

    function handleDuplicateDelete(prev, id, existingIndex, existing, oldAction) {
      if (oldAction === "update") {
        existing[0] = "delete";
        existing[1] = id;
      } else if (oldAction === "create") {
        prev.idList.splice(existingIndex, 1);
        prev.deDuped.splice(existingIndex, 1);
      }
    }

    function handleDuplicate(prev, val, id, curAction, existingIndex) {
      const existing = prev.deDuped[existingIndex];
      const oldAction = existing[0];

      // mutating prev like a muthafukka
      if (curAction === "delete") {
        handleDuplicateDelete(prev, id, existingIndex, existing, oldAction);
      } else {
        if (oldAction === "delete") {
          existing[0] = "update";

          // move id over to 3rd slot
          existing[2] = existing[1];
          existing[1] = val[1];
        } else {
          if (oldAction === "create") {
            // create always wins if it was first, otherwise
            // action stays the same
            existing[0] = "create";
          }

          // both update and create use the existing action and just update values
          Object.assign(existing[1], val[1]);
        }
      }

      return prev;
    }

    function deDupeUpdates() {
      return updates
        .reduce((prev, val) => {
          const curAction = val[0];
          const id = curAction === "delete"
            ? val[1]
            : val[2];
          const existingIndex = prev.idList.indexOf(id);

          if (existingIndex === -1) {
            // not duplicate, just add to lists
            prev.idList[prev.idList.length] = id;
            prev.deDuped[prev.deDuped.length] = val;
          } else {
            return handleDuplicate(prev, val, id, curAction, existingIndex);
          }

          return prev;
        }, {
          "idList": [],
          "deDuped": []
        })
      .deDuped;
    }

    function reduceToInnerStoreArgs(prev, val, index) {
      const id = val[0] === "delete"
        ? val[1]
        : val [2];
      const data = val[0] === "delete"
        ? { "_deleted": true }
        : val[1];

      prev.idList[index] = id;
      prev.dataList[index] = data;

      return prev;
    }

    const deDupedUpdates = deDupeUpdates(updates);

    const innerStoreArgs = deDupedUpdates
      .reduce(reduceToInnerStoreArgs, {
        "idList": [],
        "dataList": []
      });

    const updatedState = deDupedUpdates
      .reduce((prev, val) => {
        if (val [0] === "delete") {
          return deleteItemFromState(prev, val[1]);
        } else {
          return mergeItem(prev, prepareItemForMerge(val[1], val[2]), val[2]);
        }
      }, state);

    sendInnerStoreAction(this,
      "batchCreateUpdateDelete",
      innerStoreArgs.idList,
      innerStoreArgs.dataList);
    updateStoreState(this, updatedState);
  }
};

const stateCore = Object.assign(Object.create(stateCUDHelpers), {
  createNewId() {
    function randos(len) {
      var text = "";

      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }

    const randy = randos(8);
    const now = Date.now();

    return `${ now }-${ randy }`;
  },

  getItemsAsArray(items) {
    return Object.keys(items)
      .map((key) => {
        return items[key];
      });
  }
});

export default {
  openStore(storeName, opts = {}) {
    var store;

    if (!stores[storeName]) {
      store = stores[storeName] = {};
      store.stateStore = Object.create(stateCore);

      Object.assign(store.stateStore, {
        storeName,
        "subject": new Rx.ReplaySubject(1),
        "items": {}
      });

      const innerObserver = Rx.Observer.create((payload) => {
        updateStoreState(store.stateStore, mergeAll(store.stateStore.items, payload));
      });

      store.innerStore = DbProxy.openDb(storeName, opts, innerObserver);
    }

    return stores[storeName].stateStore;
  }
};
