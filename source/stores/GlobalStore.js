/**
 * Poorest mans global storage
 * @todo replace this sack of shit
 */

var globalStore = {};

// Set global defaults
globalStore.appName = "Kepler";
globalStore.currentGame = 1;

// Setup default players
globalStore.players = {};
globalStore.players.pid1 = {
  "firstName": "Wes",
  "lastName": "Ruvalcaba",
};
globalStore.players.pid2 = {
  "firstName": "Bob",
  "lastName": "Jewell",
};
globalStore.players.pid3 = {
  "firstName": "Katie",
  "lastName": "Weaver",
};
globalStore.players.pid4 = {
  "firstName": "Beej",
  "lastName": "Janice",
};
globalStore.players.pid5 = {
  "firstName": "Ross",
  "lastName": "Brown",
};

globalStore.games = {};
globalStore.games.gid1 = {
  "name": "Hearts on Guys Night",
  "players": ["pid1", "pid2", "pid4", "pid5"],
  "scores": {
    "pid1": {
      "current": 0,
      "steps": {
      }
    },
    "pid2": {
      "current": 20,
      "steps": {
        "step1": {
          "current": 0,
          "operation": "+",
          "value": 13
        },
        "step2": {
          "current": 13,
          "operation": "+",
          "value": 7
        },
      }
    },
    "pid4": {
      "current": 0,
      "steps": {
      }
    },
    "pid5": {
      "current": 0,
      "steps": {
      }
    },
  },
};


export default {
  get(fieldName) {
    if (globalStore[fieldName] === undefined) {
      globalStore.initField(fieldName);
    }
    return globalStore[fieldName];
  },

  getAll() {
    return globalStore;
  },

  set(fieldName, value) {
    globalStore[fieldName] = value;
    return value;
  },

  initField(fieldName, defaultValue = "") {
    if (globalStore[fieldName] === undefined) {
      globalStore[fieldName] = defaultValue;
    }
  }

};
