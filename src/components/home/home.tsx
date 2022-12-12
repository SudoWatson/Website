import React, { Component } from 'react'
import './home.css';

import Links from '../links/links';

type Props = {}

type State = {}

export default class home extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div id="Home">
        <div className='center'>
            <h1>Hi, I'm Austin Lennert</h1>
            < Links />
            <a href="#About"><span className="material-symbols-outlined expand_more">expand_more</span></a>
        </div>
        <img src="/imgs/stars.jpg" id="HeaderImage" />
      </div>
    )
  }
}