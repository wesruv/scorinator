/*
 * @flow-weak
 */
import { Router5 } 			from "router5";
import { linkFactory,
	segmentMixinFactory } 	from "router5-react";
import BrainDump 			from "../brain-dump/BrainDump";
import YourMom 				from "../test-components/YourMom";
import LameO 				from "../test-components/LameO";

var router = new Router5()
	.setOption( "useHash", true )
	.setOption( "defaultRoute", "braindump" )
	
	// Routes
	.addNode( "yourmom", 	"/yourmom" )
	.addNode( "lameo", 		"/lameo" )
	.addNode( "braindump", 	"/braindump" )
	.start();

const routeComponents = {
	"yourmom": YourMom,
	"lameo": LameO,
	"braindump": BrainDump
};

const Link = linkFactory( router );
const SegmentMixin = segmentMixinFactory( router );

export default { router, routeComponents, Link, SegmentMixin }; // eslint-disable-line quote-props
