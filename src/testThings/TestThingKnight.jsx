/*
 * @flow-weak
 */
import React from "react";

export default class TestThingKnight extends React.Component {
	constructor( props ) {
		super( props );

		this.updateTitle = this.updateTitle.bind( this );
		this.updateDescription = this.updateDescription.bind( this );
	}
	
	componentDidMount() {
		if ( this.props.fresh ) {
			this.props.focusFreshTestThing( this.refs.title );
		}
	}

	render() {
		var id = this.props.id,
			titleId = `title_${ id }`,
			descriptionId = `description_${ id }`;

		return (
			<div className="testThing">
				<label
					className="testThing__label testThing__label--title"
					htmlFor={ titleId }
				>Title</label>
				<input
					className="testThing__title"
					id={ titleId }
					ref="title"
					value={ this.props.title }
					onChange={ this.updateTitle }
				/>

				<label
					className="testThing__label testThing__label--description"
					htmlFor={ descriptionId }
				>Description</label>
				<textarea
					id={ descriptionId }
					className="testThing__description"
					ref="description"
					value={ this.props.description }
					onChange={ this.updateDescription }
				></textarea>
				
				<div className="testThing__basicMetadata">
					<div className="testThing__created">Created: { this.props.created.toTimeString() }</div>
				</div>
				{ this.props.children }
			</div>
			);
	}

	/*
	 * Event Handlers
	 */

	updateTitle() {
		this.props.handleFieldChange( "title", this.refs.title );
	}

	updateDescription() {
		this.props.handleFieldChange( "description", this.refs.description );
	}
}

TestThingKnight.propTypes = {
	"handleFieldChange": React.PropTypes.func.isRequired,
	"focusFreshTestThing": React.PropTypes.func.isRequired,
	"handleDelete": React.PropTypes.func.isRequired,
	"editControls": React.PropTypes.object.isRequired
};
