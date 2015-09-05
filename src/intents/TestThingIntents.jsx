/*
 * @flow-weak
 */
import Rx from "rx";

const subjects = {
	"create": new Rx.Subject(),
	"update": new Rx.Subject(),
	"delete": new Rx.Subject()
};

export default {
	subjects, // eslint-disable-line quote-props
	
	/**
	 * Intent to create a new Dumpling
	 * @param {Object} data - hash of values for new testThing
	 */
	"create": function testThingIntentCreate( data ) {
		subjects.create.onNext( data );
	},

	/**
	 * Intent to update a field of a Dumpling
	 * @param  {Number} testThingId [description]
	 * @param  {String} fieldName  [description]
	 * @param  {Any} val           [description]
	 */
	"update": function testThingIntentUpdate( testThingId, fieldName, val ) {
		subjects.update.onNext( [ testThingId, fieldName, val ] );
	},

	/**
	 * Intent to delete a Dumpling
	 * @param  {Number} testThingId [description]
	 */
	"delete": function testThingIntentDelete( testThingId ) {
		subjects.delete.onNext( testThingId );
	}
};
