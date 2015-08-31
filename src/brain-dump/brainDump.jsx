/*
 * @flow-weak
 */
import React 			from "react";
import BrainDumpKnight 	from "./BrainDumpKnight";
import DumplingSet 		from "../dumplings/DumplingSet";
import DumplingIntent 	from "../intents/DumplingIntents";
import KeyboardUtils 	from "../utils/KeyboardUtils";

export default class BrainDump extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			"handleNewDumpling": this.handleNewDumpling.bind( this )
		};
	}

	/*
	 * Lifecycle Functions
	 */

	// Create a new dumpling if user starts typing outside of an input field
	componentDidMount() {
		var body = document.querySelector( "body" ),
			handleNewDumpling = this.handleNewDumpling;

		body.addEventListener( "keyDown", function brainDumpKeydown( ev ) {
			handleNewDumpling( ev );
		} );
	}

	componentWillUnmount() {
		var body = document.querySelector( "body" ),
			handleNewDumpling = this.handleNewDumpling;

		body.removeEventListener( "keyDown", handleNewDumpling );
	}

	render() {
		return <BrainDumpKnight { ...this.state } { ...this.props }>
				<DumplingSet editMode={ true } sort="created ascending" { ...this.state } { ...this.props } />
			</BrainDumpKnight>;
	}

	/*
	 * Event Handlers
	 */

	handleNewDumpling( ev ) {
		var startingTitle = ( typeof ev.key === "string" ) ? KeyboardUtils.getText( ev.key ) : "";
		
		ev.preventDefault();
		DumplingIntent.create( [
			[ "fresh", true ],
			[ "title", startingTitle ]
		] );
	}
}
