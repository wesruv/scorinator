/*
 * @flow-weak
 */
import React 				from "react";
import StateModel 			from "../models/StateModel";
import AppKing 				from "./AppKing";
import { router,
		 routeComponents } 	from "./routes";

const App = React.createClass( {

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

		return (
			<AppKing { ...this.props }>
				<RoutedComponent { ...this.props } />
			</AppKing>
		);
	},

	/*
	 * Custom Functions
	 */

	getRouteComponent( routeState, components ) {
		var routeComponent = routeState ? components[ routeState.name.split( "." )[ 0 ] ] : <div>{ routeState.name.split( "." )[ 0 ] } is not a valid URL</div>;
		
		return routeComponent;
	}
} );

StateModel.subject.subscribe( function onSubscribeAction( appState ) {
	React.render(
		<App { ...appState } />,
		document.getElementById( "app" ) );
} );
