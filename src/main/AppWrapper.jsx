import React from "react";

export default class AppWrapper extends React.Component {
  render() {
    return (
        <div className="appShell">
          <h1>This is a test</h1>
          { this.props.children }
        </div>
      );
  }
}
