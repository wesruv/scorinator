/*
 * @flow
 */
import React from "react";
import { Router5 } from "router5";
import { linkFactory, segmentMixinFactory } from "router5-react";


/* ROUTER TEST part 1*/
var router = new Router5()
	.setOption( "useHash", true )
	.setOption( "defaultRoute", "yourmom" )
	// Routes
	.addNode( "yourmom", "/yourmom" )
	.addNode( "lameo", "/lameo" )
	.start();

console.log( "defined the router:", router );
var Link = linkFactory( router );

/* End Router Test Part 1 */

class YourMom extends React.Component {
	render() {
		console.log( "YourMom rendering now" );
		return (
			<div className="yourMom">
				YOUR MOTHER.
				<p>Alright, we'll get there in the end</p>
				<Link routeName = "lameo">LAME</Link>
			</div>
		);
	}
}

class LameO extends React.Component {
	render() {
		console.log( "LameO rendering now" );
		return (
			<div className="lameO">
				lame.
				<Link routeName = "yourmom">YOUR MOTHER</Link>
			</div>);
	}
}

/* ROUTER TEST part 2*/



var SegmentMixin = segmentMixinFactory( router );


var Main = React.createClass( {
	mixins: [
		SegmentMixin( "", function ( toState ) {
			this.setState( { routeState: toState } );
		} )
	],

	getInitialState: function () {
		return {
			routeState: router.getState()
		};
	},

	getComponent: function ( routeState ) {
		var components = {
			"yourmom": YourMom,
			"lameo": LameO
		};
		console.log( `just defined components, including "yourmom", inside of getComponent(). Route state:`, routeState );
		return routeState ? components[ routeState.name.split(".")[ 0 ] ] : undefined;
	},

	// todo: what is this?
	canDeactivate() {
		return true;
	},

	render: function () {
		var routeState = this.state.routeState;
		var Component = this.getComponent( routeState );
		var data = this.state.data;

		if( Component !== undefined ) {
			return <Component data={data} />;
		} else {
			return <div>NOT A VALID URL</div>;
		}
	}
} );


/* END ROUTER TEST */


React.render( (
	<Main />
), document.getElementById( "app" ) );
