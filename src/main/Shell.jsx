/*
 * @flow-weak
 */
import React 					from "react";
import TestNav 					from "../test-components/TestNav";
import { 	router,
			routeComponents,
			Link,
			SegmentMixin
		}	 					from "./routes";

const Shell = React.createClass( {
	"mixins": [

		SegmentMixin( "", function segmentInner( toState ) {
			this.setState( { "routeState": toState } ); // eslint-disable-line no-invalid-this
		} )
	],

	getInitialState() {
		return {
			"routeState": router.getState()
		};
	},

	"canDeactivate"() {
		return true;
	},

	render() {
		var routeState = this.state.routeState,
			RoutedComponent = this.getRouteComponent( routeState, routeComponents );

		if ( RoutedComponent !== undefined ) {
			return (
				<div className="appShell">
					<h1>Duggers</h1>
					<TestNav Link={ Link } />
					<RoutedComponent { ...this.props } />
				</div>
			);
		} else {
			return <div>NOT A VALID URL</div>;
		}
	},

	/*
	 * Custom Functions
	 */

	getRouteComponent( routeState, components ) {
		var routeComponent = routeState ? components[ routeState.name.split( "." )[ 0 ] ] : undefined;
		
		// console.log( `just retrieved components inside of getRouteComponent(). Route state: ${ JSON.stringify( routeState ) }
		//	route component: ${ routeComponent.name }` );

		return routeComponent;
	}
} );

export default Shell;
