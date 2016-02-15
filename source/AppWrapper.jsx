import React        from "react";
import globalStore  from "./stores/GlobalStore";
import GameStore    from "./data-handlers/game/Store";

export default class AppWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  componentWillMount() {
    const setState = this.setState.bind(this);
    const state = this.state;

    GameStore.subject.subscribe(function onSubscribeAction(Games) {
      if (Games && Games !== state.Games) {
        setState({
          Games
        });
      }
    });
  }
  componentWillUpdate() {
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  render() {
    var titleBarText = this.state.globalStore.appName;

    // @todo Make this grab the current game name... doesn't work right now
    if (this.state.globalStore.currentGame !== null) {
      const currentGame = this.state.globalStore.games["gid" + this.state.globalStore.currentGame];

      titleBarText = currentGame.name;
    }
    return (
        <div className="app-shell">
          <div className="app-header">
            <h1 className="app-header__title">
              {titleBarText}
            </h1>
          </div>
          {this.props.children}
        </div>
      );
  }
}
