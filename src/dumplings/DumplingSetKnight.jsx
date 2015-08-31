/*
 * @flow-weak
 */
import React from "react";

export default class DumplingSetKnight extends React.Component {

	render() {
		return <div className="dumplingSet">
			{ this.props.children }
		</div>;
	}
}
