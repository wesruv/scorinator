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
					>Click here to create new item! As long as you're not inside another item already, you can also:
					<ul>
						<li>Press Enter</li>
						<li>Just start typing!</li>
					</ul>
				</div>
			</div>
		);
	}
}

DummyDumplingKnight.propTypes = {
	"handleClick": React.PropTypes.func.isRequired
};
