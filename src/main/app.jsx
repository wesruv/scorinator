/*
 * @flow
 */
import React 				from "react";
import { Router5 } 			from "router5";
import { linkFactory,
	segmentMixinFactory } 	from "router5-react";
import BrainDump 			from "../brain-dump/brainDump";


/* ROUTER TEST part 1*/
var router = new Router5()
	.setOption( "useHash", true )
	.setOption( "defaultRoute", "yourmom" )
	
	// Routes
	.addNode( "yourmom", "/yourmom" )
	.addNode( "lameo", "/lameo" )
	.addNode( "braindump", "/braindump" )
	.start();

const Link = linkFactory( router );
const SegmentMixin = segmentMixinFactory( router );

console.log( "defined the router:", router );

/* End Router Test Part 1 */

class YourMom extends React.Component {
	render() {
		console.log( "YourMom rendering now" );
		
		return <div className="yourMom">
				YOUR MOTHER.
				<p>Alright, we got there in the end, OLD BEAN</p>
				<Link routeName = "lameo">LAME</Link>
				<Link routeName = "braindump">BRAIN DUMP</Link>
			</div>;
	}
}

class LameO extends React.Component {
	render() {
		console.log( "LameO rendering now" );
		return <div className="lameO">
				lame.
				<Link routeName = "yourmom">YOUR MOTHER</Link>
				<Link routeName = "braindump">BRAIN DUMP</Link>
			</div>;
	}
}

/* ROUTER TEST part 2*/





const Main = React.createClass( {
	"mixins": [
		SegmentMixin( "", function inner( toState ) {
			this.setState( { "routeState": toState } );
		} )
	],

	getInitialState() {
		return {
			"routeState": router.getState()
		};
	},

	getComponent( routeState ) {
		var components = {
			"yourmom": YourMom,
			"lameo": LameO,
			"braindump": BrainDump
		};

		console.log( `just defined components, including "yourmom", inside of getComponent(). Route state:`, routeState );

		return routeState ? components[ routeState.name.split( "." )[ 0 ] ] : undefined;
	},

	// todo: what is this?
	"canDeactivate"() {
		return true;
	},

	render() {
		var routeState = this.state.routeState,
			Component = this.getComponent( routeState ),
			data = this.state.data;

		if ( Component !== undefined ) {
			return <Component data={data} />;
		} else {
			return <div>NOT A VALID URL</div>;
		}
	}
} );


/* END ROUTER TEST */


React.render(
	<Main />,
	document.getElementById( "app" ) );
