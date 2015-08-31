/*
 * @flow-weak
 */
import Rx 				from "rx";
import React 			from "react";
import DumplingIntents 	from "../intents/DumplingIntents";

var update = React.addons.update,
	subject = new Rx.ReplaySubject( 1 ),
	state = {
		"dumplings": [
			{
				"id": 0,
				"title": "Do a thing!",
				"description": "so vague...",
				"created": new Date( "June 20, 2015 09:30:00" ),
				"fresh": false
			},
			{
				"id": 1,
				"title": "Another thing!",
				"description": "must add more details...",
				"created": new Date( "July 25, 2015 11:04:30" ),
				"fresh": false
			},
			{
				"id": 2,
				"title": "Think of better placeholder titles",
				"created": new Date( "August 28, 2015 17:22:00" ),
				"fresh": false
			}
		]
	};

function getNewId() {
	var highest = state.dumplings.reduce( function reduceToHighestPlusOne( prevHighest, current ) {
		return current.id > prevHighest ? current.id : prevHighest;
	}, 0 );

	return ( highest + 1 );
}

/*
 * Subscribe to Dumpling Intents
 */

DumplingIntents.subjects.create.subscribe( function modelDumplingCreate( data ) {
	var newDumpling = {
		"id": getNewId(),
		"created": Date.now()
	};

	Object.assign( newDumpling, data );

	state = Object.assign( {}, state, { "dumplings": state.dumplings
		.concat( newDumpling )
	} );

	subject.onNext( state );
} );

DumplingIntents.subjects.update.subscribe( function modelDumplingUpdate( dumpData ) {
	var [ id, field, newFieldVal ] = dumpData;

	state = Object.assign( {}, state, { "dumplings": state.dumplings
		.map( function updateDumpling( val ) {
			if ( val.id === id ) {
				return Object.assign( {}, val, { [ field ]: newFieldVal } ); // eslint-disable-line quote-props
			} else {
				return val;
			}
		} )
	} );

	subject.onNext( state );
} );

DumplingIntents.subjects.delete.subscribe( function modelDumplingDelete( id ) {
	var newDumplings = state.dumplings
		.filter( function removeDumpling( val ) {
			return val.id !== id;
		} );

	state = Object.assign( state, { "dumplings": newDumplings } );

	subject.onNext( state );
} );

subject.onNext( state );

export default { subject }; // eslint-disable-line quote-props
