import React from "react";
import {Link} 	from "react-router";
import globalStore  from "./store";


export default class mainMenuScreen extends React.Component {
  constructor() {
    super();
    globalStore.set('wakka', 'farts!!!11');
    this.state = {
      farts: "Farts!"
    };
  }
  render() {
    var lastGameName = ''; // @todo Get last game name for resume button
    return (
        <ul className="main-menu">
          <li className="main-menu__item">
            <Link to="/new-game" className="main-menu__link main-menu__link--new">
              New Game
            </Link>
          </li>
          <li className="main-menu__item">
            <a href="#" className="main-menu__link main-menu__link--resume">
              Resume Game { lastGameName }
            </a>
          </li>
          <li className="main-menu__item">
            <a href="#" className="main-menu__link main-menu__link--game-templates">
              Game Templates
            </a>
          </li>
          <li className="main-menu__item">
            <a href="#" className="main-menu__link main-menu__link--loadGame">
              Load Game
            </a>
          </li>
        </ul>
      );
  }
}
