import React 		from "react";
import TestNav 		from "../test-components/TestNav";
import { Link } 	from "./routes";

export default class AppKing extends React.Component {
	render() {
		return (
				<div className="appShell">
					<h1>Duggers</h1>
					<TestNav Link={ Link } />
					{ this.props.children }
				</div>
			);
	}
}
