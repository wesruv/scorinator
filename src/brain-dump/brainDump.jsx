/*
 * @flow-weak
 */
import React 			from "react";
import BrainDumpKnight 	from "./BrainDumpKnight";
import DumplingSet 		from "../dumplings/DumplingSet";
import DumplingIntent 	from "../intents/DumplingIntents";
import KeyboardUtils 	from "../utils/KeyboardUtils";
import GhettoLog 		from "../utils/GhettoLog";

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

	// if user starts typing with no other field or element active,
	// 	create a new dumpling
	componentDidMount() {
		var body = document.querySelector( "body" ),
			handleNewDumpling = this.handleNewDumpling;

		body.addEventListener( "keydown", function brainDumpKeydown( ev ) {
			if ( ev.currentTarget === ev.target &&
					KeyboardUtils.keyShouldTriggerAction( ev ) ) {
				if ( KeyboardUtils.keyShouldPassValue( ev ) ) {
					handleNewDumpling( ev, ev.key );
				} else {
					handleNewDumpling( ev );
				}
			}
		} );
	}

	componentWillUnmount() {
		var body = document.querySelector( "body" );

		body.removeEventListener( "keyDown", this.handleNewDumpling );
	}

	render() {
		var state = this.state,
			props = this.props;
		
		return <BrainDumpKnight { ...this.state } { ...this.props }>
				<DumplingSet editMode={ true } sort="created ascending" { ...this.state } { ...this.props } />
				<GhettoLog componentName="Brain Dump" state={ state } props={ props } />
			</BrainDumpKnight>;
	}

	/*
	 * Event Handlers
	 */

	handleNewDumpling( ev, key ) {
		var startingTitle = key ? key : "";
		
		ev.preventDefault();
		DumplingIntent.create( {
			"fresh": true,
			"title": startingTitle
		} );
	}
}
