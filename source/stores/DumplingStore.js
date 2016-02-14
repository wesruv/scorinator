// This sets up the READ side of things

import SE               from "../utilities/StorageEngine";
import DumplingIntents  from "../intents/DumplingIntents";

// Dumplings is db name in pouch
const DumplingStore = SE.openStore("Dumplings");

// Grabs whole DB
DumplingStore.requestFullState();

// Step 4
// Subscribe to create intent
// This setup first, but will get fired after Step 3
DumplingIntents.subjects.create.subscribe(function dumplingStoreIntentCreate(data) {
  const newId = DumplingStore.createNewId();
  const newDumpling = {
    "created": Date.now()
  };

  DumplingStore.create(Object.assign(newDumpling, data), newId);
});

DumplingIntents.subjects.update.subscribe(function dumplingStoreIntentUpdate([content, id]) {
  DumplingStore.update(content, id);
});

DumplingIntents.subjects.delete.subscribe(function dumplingStoreIntentDelete(id) {
  DumplingStore.delete(id);
});

export default DumplingStore;


////////////////////////////////////////

// componentWillMount() {
//   // In component will mount
//   const setState = this.setState.bind( this );
//   const state = this.state;
//
//   DumplingStore.subject.subscribe(function onSubscribeAction(dumplings) {
//     if (dumplings && dumplings !== state.dumplings) {
//       setState({
//         dumplings
//       });
//     }
//   });
// }
