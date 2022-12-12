import React, {Component} from "react";

import "./projectButton.css";

type Props = {
	url?: string;
	type: "Demo" | "Code";
};

/**
 * @param disabled - Whether the button is disabled or not
 * @param errMsg - Message explaining why the button is inactive
 */
type State = {
	disabled: boolean;
	errMsg?: string;
};

export default class projectButton extends Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props, state);

		let disabled = false;
		let errMsg;

			switch (this.props.url) {
        case null:
          disabled = true;
          break;
				case "UNAVAILABLE":
					disabled = true;
					break;
				case "UNAVAILABLE-PORTFOLIO":
					disabled = true;
					errMsg = "Woah, you're already looking at it buddy :)";
					break;
				case "UNAVAILABLE-NOLIVE":
					disabled = true;
					errMsg =
						"There is no live demo available for this project at the moment";
					break;
				case "UNAVAILABLE-NOREPO":
					disabled = true;
					errMsg =
						"There is no public code available for this project at the moment";
					break;
			}

		this.state = {
			disabled: disabled,
      errMsg: errMsg,
		};

		// Method bindings
		//this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	render() {
		return (
			<div className="project-button" onPointerOver={this.displayMsg} title={this.state.errMsg}>
				<a
        className={"button-link" + (this.state.disabled ? " disabled" : "")}
					href={this.props.url || "#"}
					rel="noreferrer"
					target="_blank"
				>
					<button
            type="button"
						className="btn btn-light"
            disabled={this.state.disabled}
					>
						{this.props.type === "Demo" && (
							<>
								<span className="material-symbols-outlined visibility">
									visibility
								</span>
								Demo
							</>
						)}
						{this.props.type === "Code" && (
							<>
								<span className="material-symbols-outlined code">
									code
								</span>
								Code
							</>
						)}
					</button>
				</a>
			</div>
		);
	}

  displayMsg() {

  }
}
