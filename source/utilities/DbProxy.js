import PouchDB        from "pouchdb";
import PouchDBFind    from "pouchdb-find";
import Rx             from "rx";

PouchDB.plugin(PouchDBFind);

const basicHelpers = {
  create(data, id) {
    if (id !== undefined) {
      return this.db.put(data, id);
    }

    if (data._id !== undefined) {
      return this.db.put(data);
    }

    return false;
  },

  read(id) {
    const readPromise = this.db.get(id);

    this.sendRxUpdate(readPromise);
  },

  readAll() {
    this.readAllCustom();
  },

  update(data, id) {
    return this.db.get(id)
      .then((res) => {
        Object.assign(res, data);
        return this.db.put(res, id);
      });
  },

  delete(id) {
    return this.db.get(id)
      .then((res) => {
        return this.db.remove(res);
      });
  }
};

const dbApi = Object.assign(Object.create(basicHelpers), {

  // options & other details: http://pouchdb.com/api.html#batch_fetch
  readAllCustom(options = {}) {
    // note: endkey is to filter out design docs
    // fun fact: 0-9 are < "_", but a-Z are > "_"
    const finalOpts = Object.assign({ "include_docs": true, "endkey": "_d" }, options);
    const readAllCustomPromise = this.db.allDocs(finalOpts);

    this.sendRxUpdate(readAllCustomPromise);
  },

  // options and other details: http://pouchdb.com/api.html#batch_create
  batchCreateUpdateDelete(docIds, docsData) {
    const db = this.db;

    return db.allDocs({
      "keys": docIds,
      "include_docs": true
    })
    .then((res) => {
      var returnedDocs = res.rows;
      const finalDocs = docsData.map((data, index) => {
        if (docIds[index]) {
          if (returnedDocs[index].id) {
            return Object.assign(returnedDocs[index].doc, data);
          }

          return Object.assign({
            "_id": docIds[index]
          }, data);
        }

        return data;
      });

      return db.bulkDocs(finalDocs);
    });
  },

  // using pouchdb-find plugin, as recommended
  // https://github.com/nolanlawson/pouchdb-find#api
  // note: find requires a suitable index to exist or doesn't do anything
  //   - it does automatically pick the most suitable, so that's something
  find(options) {
    const findPromise = this.db.find(options)
      .then((res) => {
        return res;
      });

    this.sendRxUpdate(findPromise);
  },

  createIndex(indexOptions) {
    return this.db.createIndex({ "index": indexOptions });
  },

  readIndexes() {
    return this.db.getIndexes();
  },

  deleteIndex(indexName) {
    return this.readIndexes()
      .then((res) => {
        return res.indexes.filter((el) => {
          return el.name === indexName;
        })[0];
      })
      .then((index) => {
        return this.db.deleteIndex(index);
      });
  },

  // e.g.
  // {
  //   "someId": itemObject,
  //   "otherId": itsItemObject
  // }
  convertNormalizedArrayToObject(itemArray) {
    return itemArray.reduce((prev, val) => {
      prev[val.id] = val;

      return prev;
    }, {});
  },

  // e.g. { "id": "idVal", "otherField": "etcetera" }
  // - no rev, _id -> id
  normalizeDbItem(dbResultItem) {
    return Object.keys(dbResultItem)
      .reduce((prevVal, key) => {
        if (key !== "_rev") {
          if (key === "_id") {
            prevVal.id = dbResultItem[key];
          } else {
            prevVal[key] = dbResultItem[key];
          }
        }

        return prevVal;
      }, {});
  },

  normalizeDbBatchResult(dbResult) {
    if (dbResult.rows) {
      // allDocs
      return dbResult.rows
        .map((item) => {
          return this.normalizeDbItem(item.doc);
        });
    } else if (dbResult.docs) {
      // find
      return dbResult.docs
        .map((item) => {
          return this.normalizeDbItem(item);
        });
    }

    // apparently neither apply?
    return [];
  },

  normalizeDbResult(dbResult) {
    var resArray = [];

    if (dbResult._id === undefined) {
      // allDocs or find
      resArray = this.normalizeDbBatchResult(dbResult);
    } else {
      // get
      resArray[0] = this.normalizeDbItem(dbResult);
    }

    return this.convertNormalizedArrayToObject(resArray);
  },

  sendRxUpdate(updatePromise) {
    if (this.observer) {
      updatePromise.then((res) => {
        const normalizedResult = this.normalizeDbResult(res);
        const src = Rx.Observable.create((observer) => {
          observer.onNext(normalizedResult);
        });

        src.subscribe(this.observer);
      })
      .catch((err) => {
        const src = Rx.Observable.create((observer) => {
          observer.onError(err);
        });

        src.subscribe(this.observer);

        throw err;
      });
    } else {
      console.log("no observer found");
    }
  }
});

export default {
  openDb(storeName, options = {}, innerObserver) {
    let dbObject = Object.create(dbApi); // eslint-disable-line prefer-const

    const outerObserver = Rx.Observer.create(
      (payload) => {
        if (payload.action) {
          const args = payload.args || [];

          dbObject[payload.action](...args);
        }
      },
      (err) => {
        console.log("outer observer errored", err);
      },
      () => {});

    dbObject.db = new PouchDB(storeName, options);
    dbObject.db.createIndex({
      "index": {
        "fields": ["title", "description"],
        "name": "titleAndDescIndex",
        "ddoc": "titleAndDescDDoc"
      }
    });

    dbObject.observer = innerObserver;
    dbObject.outerObserver = outerObserver;

    return dbObject;
  }
};
