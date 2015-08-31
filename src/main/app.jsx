/*
 * @flow-weak
 */
import React 				from "react";
import Shell 				from "./shell";
import StateModel 			from "../models/StateModel";

StateModel.subject.subscribe( function onSubscribeAction( appState ) {
	React.render(
		<Shell { ...appState } />,
		document.getElementById( "app" ) );
} );
