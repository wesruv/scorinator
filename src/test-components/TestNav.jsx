/*
 * @flow-weak
 */
import React 		from "react";
import { Link } 	from "../main/routes";

export default class TempNav extends React.Component {
	render() {
		return (
			<div className="tempNav">
				<p><Link routeName = "edit-screen">EDIT</Link></p>
				<p><Link routeName = "lameo">lame-o</Link></p>
				<p><Link routeName = "yourmom">YOURMOM LOL</Link></p>
			</div>
		);
	}
}
