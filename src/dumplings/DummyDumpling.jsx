/*
 * @flow-weak
 */
import React 				from "react";
import DumplingIntents 		from "../intents/DumplingIntents";
import DummyDumplingKnight 	from "./DummyDumplingKnight";

export default class DummyDumpling extends React.Component {
	constructor( props ) {
		super( props );

		this.handleClick = this.handleClick.bind( this );
	}

	render() {
		return <DummyDumplingKnight onClick={ this.handleClick } />;
	}

	/*
	 * Event Handlers
	 */

	handleClick() {
		DumplingIntents.create( [
			[ "fresh", true ]
		] );
	}
}
