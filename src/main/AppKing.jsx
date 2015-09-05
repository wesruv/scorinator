import React from "react";

export default class AppKing extends React.Component {
	render() {
		const TestNav = this.props.TestNav;

		return (
				<div className="appShell">
					<h1>Duggers</h1>
					<TestNav />
					{ this.props.children }
				</div>
			);
	}
}
