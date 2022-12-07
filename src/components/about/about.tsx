import React, { Component } from 'react';

import './about.css';

const BBCPU_IMG_PATH = process.env.PUBLIC_URL + '/imgs/breadboardCPU.jpg';

type Props = {};

type State = {};

export default class about extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div id="About" className='snap-to'>
        {/* eslint-disable-next-line*/}
        <p className="comment">// About</p>
        <div id="aboutContent">
        <p id="aboutMe">Howdy! I'm Austin Lennert, currently a first year student at Fox Valley Technical College pursuing an Associate's Degree in Software Development
          and a Technical Diploma in Web Design. For 4+ years prior to attending college I self-taught myself the core concepts of programming, as well as a few languages
          on the way. I am continuously exposing myself to new technologies, am ever curious to expand my knowledge in every facet of software, and am always eager
          to learn something new!
        </p>
        <img id="bbimg" src={BBCPU_IMG_PATH} alt="An image of the breadboard computer I built" />
        </div>
      </div>
    )
  } 
}