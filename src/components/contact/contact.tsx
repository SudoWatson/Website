import React, { Component } from 'react'

import './contact.css';

type Props = {}

type State = {}

export default class contact extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div id="Contact" className="snap-to">
        {/* eslint-disable-next-line*/}
        <p className="comment">// Contact Me</p>
        <form id="contact-form">
            <div id="contact-firstName">
                <label>First Name</label>
                <input id="contact-firstName" type="text" />
            </div>
            <div id="contact-lastName">
                <label>Last Name</label>
                <input id="contact-lastName" type="text" />
            </div>
            <div id="contact-email">
                <label>Email</label>
                <input type="email" />
            </div>
            <div id="contact-text">
                <label>Message</label>
                <input type="text" />
            </div>
        </form>
      </div>
    )
  }
}