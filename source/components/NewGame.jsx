import React                  from "react";
import globalStore            from "../stores/GlobalStore";
import GameIntents            from "../data-handlers/game/Intents";
// GameStore is used indirectly and needs to be included
import GameStore              from "../data-handlers/game/Store"; //eslint-disable-line no-unused-vars
import dataHandlerUtilities   from "../data-handlers/Utilities.js";

export default class NewGame extends React.Component {
  constructor() {
    super();

    // `this` doesn't inherit properly, any function that wants to use 'this'
    // needs to bind this in the constructor
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this.state = {
      "globalStore": globalStore.getAll(),
      "gameName": "",
      "formErrors": {
        "global": [],
        "gameName": []
      }
    };
  }
  componentWillUpdate() {
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  render() {
    // Render form errors if there are any
    const formErrors = this.state.formErrors;
    const formErrorsKeys = Object.keys(formErrors);
    // Render formErrorRegion
    var formErrorsRender = {};


    formErrorsKeys.map(function buildFormErrors(formErrorRegion) {
      const formRegionErrors = formErrors[formErrorRegion];
      var errorKey = 0;

      // Render individual errors
      const formRegionRender = formRegionErrors.map(function buildFormRegion(formRegionError) {
        errorKey++;
        return (
          <li className="new-game__error" key={errorKey}>
            {formRegionError}
          </li>
        );
      });

      if (formRegionErrors.length > 0) {
        formErrorsRender[formErrorRegion] = (
          <ul className="new-game__errors-wrapper">
            {formRegionRender}
          </ul>
        );
      } else {
        formErrorsRender[formErrorRegion] = "";
      }
    });
    return (
      <form className="new-game" onSubmit={this._handleSubmit}>
        {formErrorsRender.global}
        <div className="new-game__game-name-wrapper">
          <label className="new-game__field new-game__field--game-name" htmlFor="new-game__field--game-name">Game Name:</label>
          <input type="text" value={this.state.globalStore.gameName} onChange={this._handleChange} ref="gameName" data-ref-name="gameName" className="new-game__field" id="new-game__field--game-name"/>
          {formErrorsRender.gameName}
        </div>
        <input type="submit" value="Create Game" className="new-game__submit" />
      </form>
    );
  }

  /**
   * Custom handler for fields so they update state
   * @param  {Object} e Event from
   */
  _handleChange(e) {
    // Grabs ref from `data-ref-name` attribute
    var refName = e.target.dataset.refName;

    this.setState({
      // Sets game name in state and in globalStore
      "gameName": globalStore.set(refName, e.target.value)
    });
  }

  /**
   * Handle form submit
   * @todo this should create a game in the DB, when we have one...
   *
   * @param  {Object} e Event from
   */
  _handleSubmit(e) {
    const formErrors = this.state.formErrors;
    const formErrorKeys = Object.keys(formErrors);
    var newFormErrors = {};

    formErrorKeys.map(function createBlankErrorRegions(errorRegion) {
      newFormErrors[errorRegion] = [];
    });

    e.preventDefault();
    // Validate submission
    if (this.state.gameName.length > 0) {
      const data = {
        "name": this.state.gameName
      };

      // Using methods provided by react-router to change page on form submit
      dataHandlerUtilities.streamDataToObserver(data, GameIntents.observers.create);
      // Navigate to next page
      // this.props.history.pushState(null, "/game-screen");
      return;
    } else {
      newFormErrors.gameName.push("Must enter a game name");
    }

    // Reset existing form errors and add errors found in validation
    this.setState({
      "formErrors": newFormErrors
    });
  }

}
