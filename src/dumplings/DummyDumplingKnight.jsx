/*
 * @flow-weak
 */
import React from "react";

export default class DummyDumplingKnight extends React.Component {
	render() {
		return (
			<div onClick={ this.props.handleClick } className="dumpling dummyDumpling">
				<div
					className="dummyDumpling__text dummyDumpling__label--title"
					>Click to create new item, or just start typing!</div>
			</div>
		);
	}
}

DummyDumplingKnight.propTypes = {
	"handleClick": React.PropTypes.func.isRequired
};
