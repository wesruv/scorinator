/*
 * @flow-weak
 */
import React 		from "react";
import { Link } 	from "../main/routes";

export default class TempNav extends React.Component {
	render() {
		return (
			<div className="tempNav">
				<p><Link routeName = "braindump">BRAIN DUMP</Link></p>
				<p><Link routeName = "lameo">LAME</Link></p>
				<p><Link routeName = "yourmom">YOURMOM LOL</Link></p>
			</div>
		);
	}
}
