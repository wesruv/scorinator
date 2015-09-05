/*
 * @flow-weak
 */
import React from "react";

export default class EditScreenKnight extends React.Component {

	render() {
		return <div className="editScreen">
			<h2>EDIT THINGS HERE</h2>
			{ this.props.children }
		</div>;
	}
}
