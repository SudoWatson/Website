import React, { Component } from 'react';

import './about.css';

const BBCPU_IMG_PATH = process.env.PUBLIC_URL + '/imgs/projects/breadboardCPU.jpg';

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
        <p id="aboutMe">Howdy! I'm Austin Lennert, a recent graduate of Fox Valley Technical College and a software engineer at Skyward helping develop administration 
          software for K-12 school districts. I am focused in development using C#, Entity Framework Core, SQL, and Blazor in my work, personal projects, and from school.
          I spent 4 years before school teaching myself programming, focusing then on Java, TypeScript, and just getting a sound understanding of software development. I am
          continuously exposing myself to new technologies, am ever curious  to expand my knowledge in every facet of software, and am always eager to learn something new!
        </p>
        {/* <img id="bbimg" src={BBCPU_IMG_PATH} alt="The breadboard computer I built, more on this coming soon" /> */}
        </div>
      </div>
    )
  } 
}


/*
I'm currently a student at Fox Valley Technical College pursuing an Associate's Degree in Software Development and a Technical Diploma in Web Design. I have self-taught myself in programming for 4+ years prior to attending college. I am continuously exposing myself to new technologies, am ever curious to expand my knowledge in every facet of software, and am always eager to learn something new.
*/