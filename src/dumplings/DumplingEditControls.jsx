/*
 * @flow-weak
 */
import React from "react";

export default class DumplingEditControls extends React.Component {
	render() {
		return (
			<div className="dumpling__editControls">
				<div className="dumpling__editControls__delete"
					onClick={ this.props.handleDelete }>DELETE! DELETE! DELEEEEEETE!</div>
			</div>
			);
	}
}
