// This sets up the READ side of things

import SE             from "../../utilities/StorageEngine";
import GameIntents    from "./Intents";

// Games is db name in pouch
const GameStore = SE.openStore("Games");


// Grabs whole DB
GameStore.requestFullState();

// Step 4
// Subscribe to create intent
// This setup first, but will get fired after Step 3
GameIntents.subjects.create.subscribe(function GameStoreIntentCreate(data) {
  const newId = GameStore.createNewId();
  const newGame = {
    "created": Date.now()
  };

  GameStore.create(Object.assign(newGame, data), newId);
});

GameIntents.subjects.update.subscribe(function GameStoreIntentUpdate([content, id]) {
  GameStore.update(content, id);
});

GameIntents.subjects.delete.subscribe(function GameStoreIntentDelete(id) {
  GameStore.delete(id);
});

export default GameStore;


////////////////////////////////////////

// componentWillMount() {
//   // In component will mount
//   const setState = this.setState.bind( this );
//   const state = this.state;
//
//   GameStore.subject.subscribe(function onSubscribeAction(Games) {
//     if (Games && Games !== state.Games) {
//       setState({
//         Games
//       });
//     }
//   });
// }
