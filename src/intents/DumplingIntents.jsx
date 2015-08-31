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
	 * @param {Object} data - hash of values for new dumpling
	 */
	"create": function dumplingIntentCreate( data ) {
		subjects.create.onNext( data );
	},

	/**
	 * Intent to update a field of a Dumpling
	 * @param  {Number} dumplingId [description]
	 * @param  {String} fieldName  [description]
	 * @param  {Any} val           [description]
	 */
	"update": function dumplingIntentUpdate( dumplingId, fieldName, val ) {
		subjects.update.onNext( [ dumplingId, fieldName, val ] );
	},

	/**
	 * Intent to delete a Dumpling
	 * @param  {Number} dumplingId [description]
	 */
	"delete": function dumplingIntentDelete( dumplingId ) {
		subjects.delete.onNext( dumplingId );
	}
};
