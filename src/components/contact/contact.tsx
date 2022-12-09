import React, {Component, FormEventHandler} from "react";
import {send} from "emailjs-com";

import "./contact.css";

type Props = {};

type State = {
	from_name: string;
	message: string;
	reply_to: string;
};

export default class contact extends Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props, state);

		this.state = {
			from_name: "Anonymous",
			message: "",
			reply_to: "no-reply@gmail.com",
		};

		this.submitForm = this.submitForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div id="Contact" className="snap-to">
				{/* eslint-disable-next-line*/}
				<p className="comment">// Contact Me</p>
				<div className="row">
					<div className="col-6 offset-3">
						<form id="contact-form" onSubmit={this.submitForm}>
							<div className="row">
								<div className="col-5">
									<label htmlFor="contact-name">Name</label>
									<input
										name="contact-name"
										id="contact-name"
										className="form-control"
										onChange={this.handleChange}
										type="text"
										placeholder="John Smith"
									/>
								</div>
								<div className="col-7">
									<label htmlFor="contact-email">Email</label>
									<input
										name="contact-email"
										id="contact-email"
										className="form-control"
										onChange={this.handleChange}
										type="email"
										placeholder="john.smith@example.com"
									/>
								</div>
							</div>
							<div className="input-field">
								<label htmlFor="contact-message">Message</label>
								<textarea
									name="contact-message"
									id="contact-message"
									className="form-control"
									onChange={this.handleChange}
									required
								/>
							</div>
							<button
								id="submit-contact"
								className="btn btn-primary"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Handles sending an email when contact form is submitted
	 */
	submitForm(e: any) {
		e.preventDefault();
		let submitButton = document.getElementById("submit-contact");
		if (submitButton) {
			submitButton.setAttribute("disabled", "disabled");
			submitButton.innerHTML = "Submitting...";
		}
		// Have to use the ||'' because typescript thinks it's undefined
		send(
			process.env.REACT_APP_SERVICE_ID || "",
			process.env.REACT_APP_TEMPLATE_ID || "",
			this.state,
			process.env.REACT_APP_USER_ID || ""
		)
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
				alert("Email sent!");
			})
			.catch((err) => {
				console.log("FAILED...", err);
				alert(
					"There was an issuing contacting me. Please try again later, or just send me an email at aulennert@gmail.com"
				);
			})
			.finally(() => {
				if (submitButton) {
					submitButton.removeAttribute("disabled");
					submitButton.innerHTML = "Submit";
				}
			});
	}

	/**
	 * When a field in the Contact form is changed, this function changes the contact state to reflect the fields
	 */
	handleChange(e: any) {
		/** The key of the state parameter to apply a value to */
		let field = "";
		let blankValue = "";
		switch (e.target.name) {
			case "contact-name":
				field = "from_name";
				blankValue = "Anonymous";
				break;
			case "contact-email":
				field = "reply_to";
				blankValue = "no-reply@gmail.com";
				break;
			case "contact-message":
				field = "message";
				blankValue = "It shouldn't even be able to send this";
				break;
		}
		if (field)
			this.setState({
				...this.state,
				[field]: e.target.value || blankValue,
			});
		console.log(this.state);
		console.log(e.target.value);
	}
}
