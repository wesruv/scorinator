/*
 * @flow-weak
 */
import React from "react";

export default class DumplingKnight extends React.Component {
	constructor( props ) {
		super( props );

		this.updateTitle = this.updateTitle.bind( this );
		this.updateDescription = this.updateDescription.bind( this );
	}
	
	componentDidMount() {
		if ( this.props.fresh ) {
			this.props.focusFreshDumpling( this.refs.title );
		}
	}

	render() {
		var id = this.props.id,
			titleId = `title_${ id }`,
			descriptionId = `description_${ id }`;

		return (
			<div className="dumpling">
				{ this.props.editControls }

				<label
					className="dumpling__label dumpling__label--title"
					htmlFor={ titleId }
				>Title</label>
				<input
					className="dumpling__title"
					id={ titleId }
					ref="title"
					value={ this.props.title }
					onChange={ this.updateTitle }
				/>

				<label
					className="dumpling__label dumpling__label--description"
					htmlFor={ descriptionId }
				>Description</label>
				<textarea
					id={ descriptionId }
					className="dumpling__description"
					ref="description"
					value={ this.props.description }
					onChange={ this.updateDescription }
				></textarea>
				
				<div className="dumpling__basicMetadata">
					<div className="dumpling__created">Created: { this.props.created.toString() }</div>
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

DumplingKnight.propTypes = {
	"handleFieldChange": React.PropTypes.func.isRequired,
	"focusFreshDumpling": React.PropTypes.func.isRequired,
	"handleDelete": React.PropTypes.func.isRequired,
	"editControls": React.PropTypes.oneOfType( [
		React.PropTypes.component,
		React.PropTypes.string
	] )
};
