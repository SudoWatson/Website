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
                <div id='left'>
                    <ul id='inpage-links'>
                        <li><a href='#Home'>Home</a></li>
                        <li><a href='#About'>About</a></li>
                        <li><a href='#Skills'>Skills</a></li>
                        <li><a href='#Projects'>Projects</a></li>
                        <li><a href='#Contact'>Contact</a></li>
                    </ul>
                </div>
                <img id="logo" width={"10%"} style={{ filter: "invert(0.85)" }} src='imgs/logos/AustinLogo-01.png' />
                <div id='right'>
                    <Links />
                </div>
            </nav>
        )
    }
}