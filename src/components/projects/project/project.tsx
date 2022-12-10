import React, {Component} from "react";

import "./project.css";

import ProjectButton from "../projectButton/projectButton";

type Tag = "HTML" | "Java";

type Props = ProjectData;

/**
 * @param {boolean} isPopUpVis - Boolean of whether or not the project popup is visible
 * @param {boolean} isHovering - Boolean of whether or not the mouse is hovering over the project thumbnail
 */
type State = {
	isPopUpVis: boolean;
	isHovering: boolean;
};

// TODO Project and Skill need to have a key
export default class project extends Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props, state);

		this.state = {
			isPopUpVis: false,
			isHovering: false,
		};

		this.onClick = this.onClick.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	render() {
		// TODO Shadow still isn't lining up nicely
		return (
			<>
				<div id="ProjectThumbnail" onClick={this.onClick}>
					<img
						src={this.props.imgPath}
						alt="Test Pic"
						onMouseOver={this.onMouseOver}
						onMouseLeave={this.onMouseLeave}
					/>
					{this.state.isHovering && (
						<p id="thumbnailTitle">{this.props.title}</p>
					)}
				</div>
				{this.state.isPopUpVis && (
					<>
						<div id="PopupBackground"></div>

						{/* Popup of Project */}
						<div id="ProjectPopup" className="container ">
							<h4 id="closePopUp" onClick={this.onClick}>
								X
							</h4>

							<div id="popupContent" className="row">
								<div className="col-7 no-padding">
									<img
										src={this.props.imgPath}
										alt="Project Thumbnail"
									/>
								</div>

								<div className="col-5">
									<h2 id="title" className="row">
										{this.props.title}
									</h2>
									<div id="projectTags" className="row">
										<div className="col">
											<h5>Relavent Skills</h5>
											<p>&#123;{this.props.tags.join(", ")}&#125;</p>
										</div>
									</div>
									<div id="aboutProject" className="row">
										<div className="col">
											<h3>About</h3>
											<p>{this.props.desc}</p>
										</div>
									</div>
									<div id="buttons" className="row-inline">
										<ProjectButton
											type={"Demo"}
											url={this.props.demoURL || "#"}
										/>
										<ProjectButton
											type={"Code"}
											url={this.props.repoURL || "#"}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</>
		);
	}

	onClick() {
		this.setState({
			isPopUpVis: !this.state.isPopUpVis,
		});
	}

	onMouseOver() {
		this.setState({
			isHovering: true,
		});
	}

	onMouseLeave() {
		this.setState({
			isHovering: false,
		});
	}
}
