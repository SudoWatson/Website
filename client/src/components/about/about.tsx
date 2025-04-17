import React, { Component } from 'react';

import './about.css';

/* const BBCPU_IMG_PATH = process.env.PUBLIC_URL + '/imgs/projects/breadboardCPU.jpg'; */

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
                    <p id="aboutMe">Hello! I'm <span style={{ color: "#cba6f7" }}>Austin Lennert</span>, a graduate of <span style={{ color: "#f38ba8" }}>Fox Valley Technical College</span> and a Senior Software Engineer at <span style={{ color: "#89b4fa" }}>Skyward</span> helping develop administration software
                        for K-<span style={{ color: "#fab387" }}>12</span> school districts. Professionally I am focused in development using <span className='code list'>C#, Entity Framework Core, SQL</span>, and <span className='string'>Skyward's custom in-house web-framework</span>. For
                        personal projects I always try to learn something new and use a technology I haven't used before. Currently, I'm using <span className='code'>C++</span> to develop a <span style={{ color: "#fab387" }}>16</span>-Bit <span style={{ color: "#f9e2af" }}>Computer
                            emulator</span>. I spent <span style={{ color: "#fab387" }}>4</span> years before school teaching myself programming, focusing then on <span className='code list'>Java, TypeScript, Python</span>, and a sound understanding of software development
                        concepts. I am continuously exposing myself to <span className='string'>new technologies</span>, am ever curious to expand my knowledge in every facet of software, and am always eager to learn
                        something <span style={{ color: "#fab387" }}>new</span>!
                    </p>
                    {/* <img id="bbimg" src={BBCPU_IMG_PATH} alt="The breadboard computer I built, more on this coming soon" /> */}
                </div>
            </div >
        )
    }
}
