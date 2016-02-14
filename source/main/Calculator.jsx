import React        from "react";
import globalStore  from "../stores/GlobalStore";

export default class Calculator extends React.Component {
  constructor() {
    super();
    this._handleSubmit = this._handleSubmit.bind(this);

    // `this` doesn't inherit properly, any function that wants to use 'this'
    // needs to bind this in the constructor
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  componentWillUpdate() {
    console.log("updated calculator!");
    this.state = {
      "globalStore": globalStore.getAll()
    };
  }
  render() {
    const currentGameID = "gid" + this.state.globalStore.currentGame;
    const currentGame = this.state.globalStore.games[currentGameID];
    const currentPlayer = "pid2"; // @todo get this from URL
    const scoreOperations = currentGame.scores[currentPlayer].steps;
    const scoreOperationsKeys = Object.keys(scoreOperations);
    const scoreSteps = scoreOperationsKeys.map(function buildPlayerList(scoreStepKey) {
      console.log(scoreStepKey);
      const currentScoreStep = scoreOperations[scoreStepKey];

      return (
        <li className="calculator-screen__step" key={scoreStepKey}>
          {currentScoreStep.current} {currentScoreStep.operation} {scoreOperations[scoreStepKey].value}
        </li>
      );
    });

    return (
      <form className="calculator" onSubmit={this._handleSubmit}>
        <div className="calculator__screen calculator-screen">
          <ul className="calculator-screen__steps">
            {scoreSteps}
            <li className="calculator-screen__step calculator-screen__step--current">
              {currentGame.scores[currentPlayer].current}
            </li>
          </ul>
        </div>
        <div className="calculator__buttons">
          <ol className="calculator__numbers-wrapper">
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--9" data-value="9" onClick={this._handleButtonClick}>
                9
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--8" data-value="8" onClick={this._handleButtonClick}>
                8
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--7" data-value="7" onClick={this._handleButtonClick}>
                7
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--6" data-value="6" onClick={this._handleButtonClick}>
                6
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--5" data-value="5" onClick={this._handleButtonClick}>
                5
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--4" data-value="4" onClick={this._handleButtonClick}>
                4
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--3" data-value="3" onClick={this._handleButtonClick}>
                3
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--2" data-value="2" onClick={this._handleButtonClick}>
                2
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--1" data-value="1" onClick={this._handleButtonClick}>
                1
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--0" data-value="0" onClick={this._handleButtonClick}>
                0
              </button>
            </li>
            <li className="calculator__number-wrapper">
              <button className="calculator__number calculator__number--decimal" data-value="decimal" onClick={this._handleButtonClick}>
                .
              </button>
            </li>
          </ol>
          <ol className="calculator__operations-wrapper">
            <li className="calculator__operation-wrapper">
              <button className="calculator__operation calculator__operation--divide" data-value="divide" onClick={this._handleButtonClick}>
                %
              </button>
            </li>
            <li className="calculator__operation-wrapper">
              <button className="calculator__operation calculator__operation--multiply" data-value="multiply" onClick={this._handleButtonClick}>
                x
              </button>
            </li>
            <li className="calculator__operation-wrapper">
              <button className="calculator__operation calculator__operation--subtract" data-value="subtract" onClick={this._handleButtonClick}>
                -
              </button>
            </li>
            <li className="calculator__operation-wrapper">
              <button className="calculator__operation calculator__operation--add" data-value="add" onClick={this._handleButtonClick}>
                +
              </button>
            </li>
          </ol>
        </div>
      </form>
    );
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

  /**
   * Handle form submit
   * @todo this should create a game in the DB, when we have one...
   *
   * @param  {Object} e Event from
   */
  _handleButtonClick(e) {
    e.preventDefault();
    console.log("button click");
  }
}
