/**
 * @flow-weak
 */

/**
 * Load in dependencies
 */
import React                          from "react";
// import StateModel                  from "../models/StateModel";
import AppWrapper                     from "./AppWrapper";
import { Router, Route, IndexRoute }  from "react-router";

// globalStore is for immediate dev purposes only. It's a sack of shit.
// Declared to init globalStore so it's inherited globally throughout the app
// Does not update React's state to trigger a render
import globalStore    from "../stores/GlobalStore";

// Imported Components for Routes
import MenuScreen     from "./MenuScreen";
import NewGame        from "./NewGame";
import GameScreen     from "./GameScreen";
import Calculator     from "./Calculator";

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

/**
 * Application is wrapped by router component which handles paths
 * To add a new path/page to the application add a line like this
 * inside Router > Route:
 *
 * <Route path="DESIRED-URL" component={COMPONENT} />
 *
 * DESIRED-URL  string   The URL you'd like to enable
 * COMPONENT    include  Should correspond to an imported component
 */
React.render(
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={MenuScreen} />
      {/*
        Create new routes (paths) here. Make sure the component name
        has been imported above.
      */}
      <Route path="new-game" component={NewGame} />
      <Route path="game-screen" component={GameScreen} />
      <Route path="calculator" component={Calculator} />
    </Route>
  </Router>,
  document.getElementById("app")
);
