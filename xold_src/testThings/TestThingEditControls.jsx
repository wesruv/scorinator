/*
 * @flow-weak
 */
import React from "react";

export default class TestThingEditControls extends React.Component {
  render() {
    return (
      <div className="testThing__editControls">
        <div className="testThing__editControls__delete"
          onClick={ this.props.handleDelete }>[X] DELETE</div>
      </div>
      );
  }
}
