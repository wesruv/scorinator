/*
 * @flow-weak
 */
import React 					from "react";
import DumplingKnight 			from "./DumplingKnight";
import DumplingSet 				from "./DumplingSet";
import DumplingEditControls 	from "./DumplingEditControls";
import DumplingIntents 			from "../intents/DumplingIntents";

export default class Dumpling extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			"handleFieldChange": this.handleFieldChange.bind( this ),
			"handleDelete": this.handleDelete.bind( this ),
			"focusFreshDumpling": this.focusFreshDumpling.bind( this )
		};
	}

	/*
	 * Lifecycle Functions
	 */
	
	render() {
		var childDumplingSet = this.getChildDumplingSet(),
			editControls = this.props.editMode ? <DumplingEditControls handleDelete={ this.state.handleDelete } /> : "";

		return <DumplingKnight { ...this.props } { ...this.state } editControls={ editControls }>
				{ childDumplingSet }
			</DumplingKnight>;
	}

	/*
	 * Custom Functions
	 */
	
	getChildDumplingSet() {
		var numChildren = this.getNumberOfChildren( this.props.potentialChildren, this.props.id ),
			setProps = {
				"dumplings": this.props.potentialChildren,
				"startingDumplingId": this.props.id,
				"editMode": this.props.editMode
			};

		if ( numChildren ) {
			return <DumplingSet { ...setProps } />;
		} else {
			return "";
		}
	}

	getNumberOfChildren( maybeChildrens, parentId ) {
		var childrens = maybeChildrens.filter( function filterLegitChildren( val ) {
			return val.parent === parentId;
		} );

		return childrens.length;
	}

	getEditControls() {

	}

	/*
	 * Event Handlers
	 */

	focusFreshDumpling( ref ) {
		const newDumpling = React.findDOMNode( ref );
		const len = newDumpling.value.length;

		newDumpling.focus();
		newDumpling.setSelectionRange( len, len );
		
		DumplingIntents.update( this.props.id, "fresh", false );
	}
	
	handleFieldChange( fieldName, ref ) {
		var newVal = fieldName === "parent" ? parseInt( ref.value ) : ref.value;

		DumplingIntents.update( this.props.id, fieldName, newVal );
	}

	handleDelete() {
		DumplingIntents.delete( this.props.id );
	}
}

Dumpling.PropTypes = {
	"id": React.PropTypes.number.isRequired,
	"title": React.PropTypes.string,
	"description": React.PropTypes.string,
	"created": React.PropTypes.instanceOf( Date ),
	"parent": React.PropTypes.number,
	"zone": React.PropTypes.number,
	"lastUpdated": React.PropTypes.instanceOf( Date ),
	"begin": React.PropTypes.instanceOf( Date ),
	"end": React.PropTypes.instanceOf( Date ),
	"fresh": React.PropTypes.bool,

	"editMode": React.PropTypes.bool,
	"potentialChildren": React.PropTypes.array
};

Dumpling.DefaultProps = {
	"editMode": false
};
