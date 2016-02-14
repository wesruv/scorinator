// Handles the write part of things
/*
 * @flow-weak
 */
import Rx from "rx";

function isValidId(id) {
  return typeof id === "string";
}

function isValidUpdateContent(content) {
  return typeof content === "object" &&
    content !== null &&
    Object.keys(content).length > 0;
}

const subjects = {
  "create": new Rx.Subject(),
  "update": new Rx.Subject(),
  "delete": new Rx.Subject()
};

/*
// Example function from View layer to take advantage of "create" observer below
// Dumpling is a type of content, could easily be replaced with "Game" or "Player"
import React            from "react";
import Rx               from "rx";
import DumplingIntents  from "../intents/DumplingIntents";

function streamDataToObserver(data, subscribingObserver) {
  Rx.Observable
    .create((currentObserver) => {
      // Step 1
      // Updates all subscribers
      // Creating a stream
      currentObserver.onNext( data );
    })
    // Step 2
    // Subscribe the observer to what we just made
    // Point the stream to the create intent
    .subscribe(subscribingObserver);
}

// Create new data
streamDataToObserver(data, DumplingIntents.observers.create);

// Update Data
var data = [{fieldName: fieldValue}, game-id];
streamDataToObserver(data, DumplingIntents.observers.update);

 */

const observers = {
  "create": Rx.Observer.create(
    (data) => {
      // Step 3
      // If we get some data, make sure it's valid and pass along to subscribers
      if (typeof data === "object" &&
        data !== null) {
        subjects.create.onNext(data);
      }
    },
    (err) => {
      throw err;
    },
    () => {}
 ),
  "update": Rx.Observer.create(
    (onNextPayload) => {
      if (onNextPayload !== undefined) {
        if (Array.isArray(onNextPayload)) {
          const [content = undefined, dumplingId = undefined] = onNextPayload;

          if (isValidId(dumplingId) &&
            isValidUpdateContent(content)) {
            subjects.update.onNext([content, dumplingId]);
          } else {
            console.log("tried to send inadequate arguments to update intent: ", onNextPayload);
          }
        } else {
          throw new Error("update intent only accepts a single array");
        }
      }
    },
    (err) => {
      throw err;
    },
    () => {}
 ),
  "delete": Rx.Observer.create(
    (dumplingId) => {
      if (typeof dumplingId === "string") {
        subjects.delete.onNext(dumplingId);
      }
    },
    (err) => {
      throw err;
    },
    () => {}
 )
};

export default {
  subjects,
  observers
};
