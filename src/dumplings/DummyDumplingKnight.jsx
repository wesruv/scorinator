/*
 * @flow-weak
 */
import React from "react";

export default class DummyDumplingKnight extends React.Component {
	render() {
		return (
			<div className="dummyDumpling">
				<label className="dumpling__label dumpling__label--title dummyDumpling__label dummyDumpling__label--title"
				>Title</label>
				<input className="dumpling__title dummyDumpling__title"
					value="Click to create new item!"
				/>

				<label className="dumpling__label dumpling__label--description dummyDumpling__label dummyDumpling__label--description"
				>Description</label>
				<textarea
					className="dumpling__description"
					value="...or just start typing!"
				></textarea>
			</div>
		);
	}
}
