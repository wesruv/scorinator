import React        from "react";
import {Link}       from "react-router";
import globalStore  from "./store";

export default class mainMenuScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      farts: "Farts!"
    };
  }
  render() {
    var lastGameName = ''; // @todo Get last game name for resume button
    return (
      <div>
        <h1>{this.state.farts}</h1>
        <h2>{globalStore.get('wakka')}</h2>
      </div>
    );
  }
}
