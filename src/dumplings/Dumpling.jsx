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
		var numChildren = this.getNumberOfChildren( this.props.potentialChildren ),
			setProps = {
				"dumplings": this.props.potentialChildren,
				"startingDumpling": this.props.id
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
		React.findDOMNode( ref ).focus();
		DumplingIntents.update( this.props.id, "fresh", false );
	}
	
	handleFieldChange( fieldName, ref ) {
		DumplingIntents.update( this.props.id, fieldName, ref.value );
	}

	handleDelete() {
		DumplingIntents.delete( this.props.id );
	}
}

Dumpling.PropTypes = {
	"id": React.PropTypes.string.isRequired,
	"title": React.PropTypes.string,
	"description": React.PropTypes.string,
	"parent": React.PropTypes.string,
	"zone": React.PropTypes.number,
	"created": React.PropTypes.instanceOf( Date ),
	"lastUpdated": React.PropTypes.instanceOf( Date ),
	"begin": React.PropTypes.instanceOf( Date ),
	"end": React.PropTypes.instanceOf( Date ),
	"fresh": React.PropTypes.bool,

	"potentialChildren": React.PropTypes.array,
	"editMode": React.PropTypes.bool
};

Dumpling.DefaultProps = {
	"editMode": false
};
