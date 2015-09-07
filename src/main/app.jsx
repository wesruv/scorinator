/*
 * @flow-weak
 */
import React         from "react";
import StateModel       from "../models/StateModel";
import AppKing         from "./AppKing";
import EditScreen       from "../edit-screen/EditScreen";

const App = React.createClass({
  render() {
    return (
      <AppKing { ...this.props }>
        <EditScreen { ...this.props } />
      </AppKing>
    );
  },
});

StateModel.subject.subscribe(function onSubscribeAction(appState) {
  React.render(
    <App { ...appState } />,
    document.getElementById("app"));
});
