import React from "react";

// ghettoLog( componentName, state, props ) {
export default class GhettoLog extends React.Component {
	render() {
		var { componentName, state, props } = this.props;// eslint-disable-line quote-props

		return <div className="reactDataDebug">
			<div className="stateDump">
				<h3>{ componentName } State:</h3>
				{ logOutData( componentName, "state", state ) }
			</div>
			<div className="propsDump">
				<h3>{ componentName } Props:</h3>
				{ logOutData( componentName, "props", props ) }
			</div>
		</div>;
	}
}

/* eslint-disable no-unused-expressions */
/* eslint-disable semi */
function logOutData( componentName, dataType, data ) {
	return <div className="logged">
		{ ( function loggerIIFE() {
			return Object.keys( data )
				.map( function eachDataKey( key ) {
					return <ul key={ `${ componentName }_${ dataType }_${ key }` } className="dataProp">
						<li>{ key }
							{ getSubData( key, data[ key ] ) }
						</li>
					</ul>;
				} );
		}
		)() }
	</div>;
}

function getSubData( key, obj ) {
	if ( Object.prototype.toString.call( obj ) === "[object Array]" ) {
		let i = 0;

		return <ul>
			{ obj.map( function subDataEach( val ) {
				return <li key={ `${ key }_${ ++i }` }>{ getVal( val ) }</li>
			} ) }
		</ul>;
	} else {
		return <ul><li>{ getVal( obj ) }</li></ul>
	}
}

function getVal( obj ) {
	if ( typeof obj === "function" ) {
		return obj.toString();
	} else {
		return JSON.stringify( obj );
	}
}

/* eslint-enable no-unused-expressions */
/* eslint-enable semi */
