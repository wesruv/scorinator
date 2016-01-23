import React from "react";

export default class AppWrapper extends React.Component {
  render() {
    var appHeaderTitle = "Kepler"; // @todo logic to set title to

    return (
        <div className="app-shell">
          <div className="app-header">
            <h1 className="app-header__title">
              { appHeaderTitle }
            </h1>
          </div>
          { this.props.children }
        </div>
      );
  }
}
