import React        from "react";
import globalStore  from "./GlobalStore";

export default class NewGame extends React.Component {
  constructor() {
    super();

    // `this` doesn't inherit properly, any function that wants to use 'this'
    // needs to bind this in the constructor
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  componentWillUpdate() {
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  render() {
    return (
      <form className="new-game" onSubmit={this._handleSubmit}>
        <label className="new-game__field new-game__field--game-name" htmlFor="new-game__field--game-name">Game Name:</label>
        <input type="text" value={this.state.globalStore.gameName} onChange={this._handleChange} ref="gameName" data-ref-name="gameName" className="new-game__field" id="new-game__field--game-name"/>
      </form>
    );
  }

  /**
   * Custom handler for fields so they update state
   * @param  {Object} e Event from
   */
  _handleChange(e) {
    var refName = e.target.dataset.refName;

    this.setState({"gameName": globalStore.set(refName, this.refs[refName].value)});
  }

  /**
   * Handle form submit
   * @todo this should create a game in the DB, when we have one...
   *
   * @param  {Object} e Event from
   */
  _handleSubmit(e) {
    e.preventDefault();

    // Using methods provided by react-router to change page on form submit
    this.props.history.pushState(null, "/game-screen");
  }
}
