/**
 * @flow-weak
 */

/**
 * Load in dependencies
 */
import React          from "react";
// import StateModel    from "../models/StateModel";
import AppWrapper     from "./AppWrapper";
import MenuScreen     from "./MenuScreen";
import NewGame        from "./NewGame";
import { Router, Route, IndexRoute } 	from "react-router";
import globalStore    from "./store";

globalStore.set('wakka', 'burps!!!11');

/**
 * Create <App /> and structure it's children
 */
const App = React.createClass({
  render() {
    return (
      <AppWrapper>
        { this.props.children }
      </AppWrapper>
    );
  },
});

class NewGameWrapper extends React.Component {
  render() {
    return (
      <NewGame globalState = {{"wakka": "wakka?"}} />
    );
  }
}

React.render(
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={MenuScreen} />
      <Route path="new-game" component={NewGameWrapper} />
    </Route>
  </Router>,
  document.getElementById("app")
);
