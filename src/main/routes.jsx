/*
 * @flow-weak
 */
import { Router5 } 			from "router5";
import { linkFactory } 		from "router5-react";
import EditScreen 			from "../edit-screen/EditScreen";
import YourMom 				from "../test-components/YourMom";
import LameO 				from "../test-components/LameO";

var router = new Router5()
	.setOption( "useHash", true )
	.setOption( "defaultRoute", "braindump" )
	
	// Routes
	.addNode( "yourmom", 	"/yourmom" )
	.addNode( "lameo", 		"/lameo" )
	.addNode( "edit-screen", 	"/edit" )
	.start();

const routeComponents = {
	"yourmom": YourMom,
	"lameo": LameO,
	"edit-screen": EditScreen
};

const Link = linkFactory( router );

export default { router, routeComponents, Link }; // eslint-disable-line quote-props
