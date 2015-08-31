import React from "react";

export default {
	log( componentName, state, props ) {
		return <div className="reactDataDebug">
			<div className="stateDump">
				<h3>{ componentName } State:</h3>
				{ logOutData( state ) }
			</div>
			<div className="propsDump">
				<h3>{ componentName } Props:</h3>
				{ logOutData( props ) }
			</div>
		</div>;
	}
};

/* eslint-disable no-unused-expressions */
/* eslint-disable semi */
function logOutData( data ) {
	return <div className="logged">
		{ ( function loggerIIFE() {
			return Object.keys( data )
				.map( function eachDataKey( key ) {
					return <ul className="dataProp">
						<li>{ key }
							{ getSubData( data[ key ] ) }
						</li>
					</ul>;
				} );
		}
		)() }
	</div>;
}

function getSubData( obj ) {
	if ( Object.prototype.toString.call( obj ) === "[object Array]" ) {
		return <ul>
			{ obj.map( function subDataEach( val ) {
				return <li>{ JSON.stringify( val ) }</li>
			} ) }
		</ul>;
	} else {
		return <ul><li>{ JSON.stringify( obj ) }</li></ul>
	}
}

/* eslint-enable no-unused-expressions */
/* eslint-enable semi */
