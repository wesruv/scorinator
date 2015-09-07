/**
 * @flow-weak
 */

/**
 * Load in dependencies
 */
import React         from "react";
import StateModel    from "../models/StateModel";
import AppWrapper    from "./AppWrapper";

/**
 * Create <App /> and structure it's children
 */
const App = React.createClass({
  render() {
    return (
      <AppWrapper { ...this.props }>
        <EditScreen { ...this.props } />
      </AppWrapper>
    );
  },
});
