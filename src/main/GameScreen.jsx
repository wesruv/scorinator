import React        from "react";
import {Link}       from "react-router";
import globalStore  from "./GlobalStore";

export default class GameScreen extends React.Component {
  constructor() {
    super();

    // @todo for dev purposes only
    globalStore.set("currentGame", 1);

    this.state = {
      "globalStore": globalStore.getAll(),
      "newPlayerOverlay": false
    };
  }
  render() {
    // Render a list of players if there are any
    const currentGameID = "gid" + this.state.globalStore.currentGame;
    const currentGame = this.state.globalStore.games[currentGameID];
    const _this = this;
    const playersList = currentGame.players.map(function buildPlayerList(playerKey) {
      const player = _this.state.globalStore.players[playerKey];
      const currentScore = currentGame.scores[playerKey];

      return (
        <li className="game-screen__player player player--list" key={playerKey}>
          <h3 className="player__name">
            {player.firstName}
          </h3>
          <div className="player__current-score">
            {currentScore}
          </div>
          <Link to={"calculator/" + currentGameID + "/" + playerKey} className="player__action player__action--score">
            Score
          </Link>
        </li>
      );
    });

    return (
      <div className="game-screen">
        <ul className="game-screen__players-list">
          {playersList}
          <li className="game-screen__add-player">
            <Link to="/add-player" className="game-screen__add-player__link">Add Player</Link>
          </li>
        </ul>
      </div>
    );
  }
}
