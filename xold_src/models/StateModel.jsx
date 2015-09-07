/*
 * @flow-weak
 */
import Rx         from "rx";
import TestThingIntents     from "../intents/TestThingIntents";

var subject = new Rx.ReplaySubject(1),
  state = {
    "testThings": [
      {
        "id": 0,
        "title": "Do a thing!",
        "description": "so vague...",
        "created": new Date("June 20, 2015 09:30:00"),
        "fresh": false
      },
      {
        "id": 1,
        "title": "Another thing!",
        "description": "must add more details...",
        "created": new Date("July 25, 2015 11:04:30"),
        "fresh": false
      },
      {
        "id": 2,
        "title": "Think of better placeholder titles",
        "created": new Date("August 28, 2015 17:22:00"),
        "fresh": false
      }
    ]
  },
  highestId = 2;

function getNewId() {
  var highest = state.testThings.reduce(function reduceToHighestPlusOne(prevHighest, current) {
    return current.id > prevHighest ? current.id : prevHighest;
  }, highestId);

  highestId = highest > highestId ? highest : highestId;

  return (++highestId);
}

/*
 * Subscribe to TestThing Intents
 */

TestThingIntents.subjects.create.subscribe(function modelTestThingCreate(data) {
  var newTestThing = {
    "id": getNewId(),
    "created": new Date(Date.now())
  };

  Object.assign(newTestThing, data);

  state = Object.assign({}, state, { "testThings": state.testThings
    .concat(newTestThing)
  });

  subject.onNext(state);
});

TestThingIntents.subjects.update.subscribe(function modelTestThingUpdate(thingData) {
  var [id, field, newFieldVal] = thingData;

  state = Object.assign({}, state, { "testThings": state.testThings
    .map(function updateTestThing(val) {
      if (val.id === id) {
        const newVal = Object.assign({}, val, { [field]: newFieldVal }); // eslint-disable-line quote-props

        if (!newFieldVal) {
          delete newVal[field];
        }
        return newVal;
      } else {
        return val;
      }
    })
  });

  subject.onNext(state);
});

TestThingIntents.subjects.delete.subscribe(function modelTestThingDelete(id) {
  var newTestThings = state.testThings
    .filter(function removeTestThing(val) {
      return val.id !== id;
    });

  state = Object.assign(state, { "testThings": newTestThings });

  subject.onNext(state);
});

subject.onNext(state);

export default { subject }; // eslint-disable-line quote-props
