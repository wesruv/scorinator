/*
 * @flow-weak
 */
import React         from "react";
import TestThingSetKnight   from "./TestThingSetKnight";
import TestThing       from "./TestThing";

export default class TestThingSet extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
   * Lifecycle Functions
   */

  render() {
    var testThings = this.buildTestThingComponents();

    return (
      <TestThingSetKnight { ...this.props } { ...this.state }>
        { this.props.children }
        { testThings }
      </TestThingSetKnight>
    );
  }

  /*
   * Custom Functions
   */

  // recursive! (on the component level... unless nest is set to false)
  buildTestThingComponents() {
    var testThings = this.props.testThings.filter(this.props.filter);

    return testThings
      .map(function mapTestThings(testThing) {
        return <TestThing key={ testThing.id } { ...testThing } />;
      });
  }
}

TestThingSet.propTypes = {
  "testThings": React.PropTypes.array.isRequired,
  "filter": React.PropTypes.func
};

TestThingSet.defaultProps = {
  "filter": (testThing) => { return testThing; }
};
