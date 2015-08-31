/*
 * @flow-weak
 */
import Rx 				from "rx";
import DumplingIntents 	from "../intents/DumplingIntents";

var subject = new Rx.ReplaySubject( 1 ),
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
	var highest = state.reduce( function reduceToHighestPlusOne( prevHighest, current ) {
		var numberForm = parseInt( current.id, 10 );

		return numberForm > prevHighest ? numberForm : prevHighest;
	} );

	return ( highest + 1 ).toString();
}

/*
 * Subscribe to Dumpling Intents
 */

DumplingIntents.subjects.create.subscribe( function modelDumplingCreate( data ) {
	var newDumpling = {
		"created": Date.now()
	};

	newDumpling.id = getNewId();
	data.forEach( function addEachProperty( propArray ) {
		newDumpling[ propArray[ 0 ] ] = propArray[ 1 ];
	} );

	state = Object.assign( {}, state, { "dumplings": state.dumplings
		.slice( 0 )
		.push( newDumpling )
	} );

	console.log( `With any luck, new dumpling with has been created. Info: ${ JSON.stringify( data ) }
		Dumplings: ${ JSON.stringify( state[ state.length - 1 ] ) }` );

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
	state = state
		.filter( function removeDumpling( val ) {
			return val.id !== id;
		} );

	console.log( `dumpling "${ id }" has been deleted... hopefully.
		Dumplings: ${ JSON.stringify( state ) }` );

	subject.onNext( state );
} );

subject.onNext( state );

export default { subject }; // eslint-disable-line quote-props
