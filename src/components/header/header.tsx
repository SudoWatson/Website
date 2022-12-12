import React, { Component } from 'react'

import './header.css';

import Links from '../links/links';

type Props = {};

type State = {};

export default class header extends Component<Props, State> {
  state = {}

  render() {
    return (
      <nav id='main-nav'>
        <ul id='inpage-links'>
          <li><a href='#Home'>Home</a></li>
          <li><a href='#About'>About</a></li>
          <li><a href='#Skills'>Skills</a></li>
          <li><a href='#Projects'>Projects</a></li>
          <li><a href='#Contact'>Contact</a></li>
        </ul>
        <Links />
      </nav>
    )
  }
}