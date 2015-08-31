/*
 * @flow-weak
 */
import React 				from "react";
import DumplingSetKnight 	from "./DumplingSetKnight";
import Dumpling 			from "./Dumpling";
import DummyDumpling 		from "./DummyDumpling";

export default class DumplingSet extends React.Component {
	constructor( props ) {
		super( props );
	}

	/*
	 * Lifecycle Functions
	 */

	render() {
		var dumplings = this.buildDumplingComponents(),
			dummyDumpling = this.props.editMode === true ? <DummyDumpling /> : "";

		return (
			<DumplingSetKnight { ...this.props } { ...this.state }>
				{ dummyDumpling }
				{ dumplings }
			</DumplingSetKnight>
		);
	}

	/*
	 * Custom Functions
	 */

	// recursive! (on the component level... unless nest is set to false)
	buildDumplingComponents() {
		var dumplings = this.props.dumplings.filter( this.props.filter ),
			currentLevelDumplings = this.getCurrentLevelDumplings( dumplings ),
			nonCurrentDumplings = this.props.nest ? this.getNonCurrentDumplings( dumplings, currentLevelDumplings ) : [],
			editMode = this.props.editMode,
			sortFunction = this.getSortFunction();
		
		return currentLevelDumplings
			.sort( sortFunction )
			.map( function mapDumplings( dumpling ) {
				return <Dumpling key={ dumpling.id } { ...dumpling } editMode={ editMode } potentialChildren={ nonCurrentDumplings } />;
			} );
	}

	getCurrentLevelDumplings( dumplings ) {
		// if startingDumplingId is specified, current level is every child of the specified dumpling
		// if no startingDumplingId is specified, then it's top-level,
		// 	so current level is every dumpling with no parent
		var startingDumplingId = this.props.startingDumplingId;

		if ( startingDumplingId ) {
			return dumplings
				.filter( function hasStartingDumplingFilter( val ) {
					return val.parent === startingDumplingId;
				} );
		} else {
			return dumplings
				.filter( function noStartingDumplingFilter( val ) {
					return !val.parent;
				} );
		}
	}

	getNonCurrentDumplings( dumplings, currentLevelDumplings ) {
		return dumplings
			.filter( function filterOutCurrentDumplings( val ) {
				return currentLevelDumplings.indexOf( val ) === -1;
			} );
	}

	getSortFunction() {
		var sortByName = this.props.sort,
			customSort = this.props.customSort;

		function doNotSort() { return 0; }

		if ( customSort ) {
			return customSort;
		} else if ( !sortByName ) {
			return doNotSort;
		}

		switch ( sortByName ) {
			case "created ascending":
				return function sortByCreatedAscending( a, b ) {
					if ( a > b ) {
						return -1;
					} else {
						if ( a < b ) {
							return 1;
						} else {
							return 0;
						}
					}
				};
		}
	}
}

DumplingSet.propTypes = {
	"dumplings": React.PropTypes.array.isRequired,
	"editMode": React.PropTypes.bool,
	"filter": React.PropTypes.func,
	"startingDumplingId": React.PropTypes.string,
	"nest": React.PropTypes.bool,
	"sort": React.PropTypes.string,
	"customSort": React.PropTypes.func
};

DumplingSet.defaultProps = {
	"editMode": false,
	"filter": ( dumpling ) => { return dumpling; },
	"startingDumplingId": "",
	"nest": true,
	"sort": ""
};
