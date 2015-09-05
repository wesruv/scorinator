/*
 * @flow-weak
 */
import React 			from "react";
import EditScreenKnight 	from "./EditScreenKnight";
import TestThingSet 		from "../testThings/TestThingSet";
import TestThingIntent 	from "../intents/TestThingIntents";
import KeyboardUtils 	from "../utils/KeyboardUtils";
import GhettoLog 		from "../utils/GhettoLog";
import DummyTestThing 	from "../testThings/DummyTestThing";

export default class EditScreen extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			"handleNewTestThing": this.handleNewTestThing.bind( this )
		};
	}

	/*
	 * Lifecycle Functions
	 */

	// if user starts typing with no other field or element active,
	// 	create a new testThing
	componentDidMount() {
		var body = document.querySelector( "body" ),
			handleNewTestThing = this.handleNewTestThing;

		body.addEventListener( "keydown", function editScreenKeydown( ev ) {
			if ( ev.currentTarget === ev.target ) {
				// chrome, possibly others, don't support ev.key
				if ( ev.key ) {
					if ( KeyboardUtils.keyShouldTriggerWithValue( ev ) ) {
						handleNewTestThing( ev, ev.key );
					} else {
						if ( KeyboardUtils.keyShouldTriggerWithNoValue( ev ) ) {
							handleNewTestThing( ev );
						}
					}
				} else {
					// do non-ev.key-supporting stuff
					if ( KeyboardUtils.keyShouldTriggerWithNoValue( ev ) ) {
						handleNewTestThing( ev );
					}
				}
			}
		} );
	}

	componentWillUnmount() {
		var body = document.querySelector( "body" );

		body.removeEventListener( "keyDown", this.handleNewTestThing );
	}

	render() {
		var state = this.state,
			props = this.props;
		
		return <EditScreenKnight { ...this.state } { ...this.props }>
				<TestThingSet { ...this.state } { ...this.props }>
					<DummyTestThing />
				</TestThingSet>
				<GhettoLog componentName="Edit Screen" state={ state } props={ props } />
			</EditScreenKnight>;
	}

	/*
	 * Event Handlers
	 */

	handleNewTestThing( ev, key ) {
		var startingTitle = key ? key : "";
		
		ev.preventDefault();
		TestThingIntent.create( {
			"fresh": true,
			"title": startingTitle
		} );
	}
}
