/*
 * @flow-weak
 */
import React         from "react";
import TestThingIntents     from "../intents/TestThingIntents";
import DummyTestThingKnight   from "./DummyTestThingKnight";

export default class DummyTestThing extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <DummyTestThingKnight handleClick={ this.handleClick } />;
  }

  /*
   * Event Handlers
   */

  handleClick() {
    TestThingIntents.create(
      {
        "fresh": true
      });
  }
}
