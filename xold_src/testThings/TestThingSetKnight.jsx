/*
 * @flow-weak
 */
import React from "react";

export default class TestThingSetKnight extends React.Component {

  render() {
    return <div className="testThingSet">
      { this.props.children }
    </div>;
  }
}
