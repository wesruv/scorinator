/*
 * @flow-weak
 */
import React from "react";

export default class DummyTestThingKnight extends React.Component {
	render() {
		return (
			<div onClick={ this.props.handleClick }>
				<div>Click here to create new item! As long as you're not inside another item already, you can also:
					<ul>
						<li>Press Enter</li>
						<li>Just start typing!</li>
					</ul>
				</div>
			</div>
		);
	}
}

DummyTestThingKnight.propTypes = {
	"handleClick": React.PropTypes.func.isRequired
};
