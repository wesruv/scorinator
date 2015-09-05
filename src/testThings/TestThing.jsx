/*
 * @flow-weak
 */
import React 					from "react";
import TestThingKnight 			from "./TestThingKnight";
import TestThingEditControls 	from "./TestThingEditControls";
import TestThingIntents 			from "../intents/TestThingIntents";

export default class TestThing extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			"handleFieldChange": this.handleFieldChange.bind( this ),
			"handleDelete": this.handleDelete.bind( this ),
			"focusFreshTestThing": this.focusFreshTestThing.bind( this )
		};
	}

	/*
	 * Lifecycle Functions
	 */
	
	render() {
		return (
			<TestThingKnight { ...this.props } { ...this.state }>
				<TestThingEditControls handleDelete={ this.state.handleDelete } />
			</TestThingKnight>
		);
	}

	/*
	 * Event Handlers
	 */

	focusFreshTestThing( ref ) {
		const newTestThing = React.findDOMNode( ref );
		const len = newTestThing.value.length;

		newTestThing.focus();
		newTestThing.setSelectionRange( len, len );
		
		TestThingIntents.update( this.props.id, "fresh", false );
	}
	
	handleFieldChange( fieldName, ref ) {
		const newVal = ref.value;

		TestThingIntents.update( this.props.id, fieldName, newVal );
	}

	handleDelete() {
		TestThingIntents.delete( this.props.id );
	}
}

TestThing.PropTypes = {
	"id": React.PropTypes.number.isRequired,
	"title": React.PropTypes.string,
	"description": React.PropTypes.string,
	"created": React.PropTypes.instanceOf( Date ),
	"fresh": React.PropTypes.bool
};
