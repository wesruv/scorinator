/*
 * @flow-weak
 */
import React from "react";

export default class BrainDumpKnight extends React.Component {

	render() {
		return <div className="brainDump">
			<h2>DUMP YOUR BRAINS HERE</h2>
			{ this.props.children }
		</div>;
	}
}
