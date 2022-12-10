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
  errMsg?: string,
};

export default class projectButton extends Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props, state);

		this.state = {
			disabled: false,
		};

    if (this.props.url) {
      switch (this.props.url) {
        case "UNAVAILABLE":
          this.setState({...this.state, disabled: true});
          break;
        case "UNAVAILABLE-NOLIVE":
          this.setState({...this.state, disabled: true, errMsg: "There is no live demo available for this project at the moment"});
          break;
        case "UNAVAILABLE-NOREPO":
          this.setState({...this.state, disabled: true, errMsg: "There is no public code available for this project at the moment"})
      }
    }

		// Method bindings
		//this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	render() {
		return (
			<div className="project-button">
				<a
					href={this.props.url || "#"}
					rel="noreferrer"
					target="_blank"
				>
					<button className="btn btn-light" disabled={this.state.disabled}>
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
}
