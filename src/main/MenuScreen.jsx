import React from "react";

export default class mainMenuScreen extends React.Component {
  render() {
    var lastGameName = ''; // @todo Get last game name for resume button
    return (
        <ul className="main-menu">
          <li className="main-menu__item">
            <a href="#" className="main-menu__link main-menu__link--new">
              New Game
            </a>
          </li>
          <li className="main-menu__item">
            <a href="#" className="main-menu__link main-menu__link--resume">
              Resume Game {{lastGameName}}
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
