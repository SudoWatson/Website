import React, {Component} from "react";
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
		this.clearForm = this.clearForm.bind(this);
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
		// Darkens and disables the submit button until finished
		e.preventDefault();
		let submitButton = document.getElementById("submit-contact");
		if (submitButton) {
			submitButton.setAttribute("disabled", "disabled");
			submitButton.innerHTML = "Submitting...";
		}
		// Sends an email using EmailJS
		try {
			send(
				"service_gk0juih",
				"template_hwn8aq6",
				this.state,
				"6SRPpJOOu8isKZdqf"
			)
			.then((response) => {
				// Email sent successfully
				alert("Email sent!");
				this.clearForm(e.target);
			})
			.catch((err2) => {
				// Email failed
				console.error("FAILED...", err2);
				alert(
					"There was an issuing contacting me. Please try again later, or just send me an email at aulennert@gmail.com"
				);
			})
			.finally(() => {
				// Reactivate submit button
				if (submitButton) {
					submitButton.removeAttribute("disabled");
					submitButton.innerHTML = "Submit";
				}
			});
		} catch (err) {
			// Email failed
			console.error("FAILED...", err);
			alert(
				"There was an issuing contacting me. Please try again later, or just send me an email at aulennert@gmail.com"
			);
		}
	}

	/**
	 * Clears all input fields from a given form
	 * @param form - Form element to clear
	 */
	clearForm(form: HTMLFormElement) {
		//TODO Clear the form
		let inputs = form.getElementsByTagName("input");
		let textAreas = form.getElementsByTagName("textarea");
		let inputElements = [...inputs, ...textAreas];

		for (let element of inputElements) {
			element.value = "";
		}
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
	}
}
