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
	"createDumpling": function dumplingIntentCreate( data ) {
		subjects.create.onNext( data );
	},
	"update": function dumplingIntentUpdate( dumplingId, fieldName, val ) {
		subjects.update.onNext( [ dumplingId, fieldName, val ] );
	},
	"delete": function dumplingIntentDelete( dumplingId ) {
		subjects.delete.onNext( dumplingId );
	}
};
