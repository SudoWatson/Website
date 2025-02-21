import React, { Component } from 'react';

import './links.css';

const GH_LOGO_PATH = process.env.PUBLIC_URL + '/imgs/github-mark-white.png';
const LI_LOGO_PATH = process.env.PUBLIC_URL + '/imgs/linkedin.png';

type Props = {};

type State = {};

export default class links extends Component<Props, State> {

    render() {
        return (
            <ul className='social-links'>
                <li><a title="GitHub" href='https://github.com/SudoWatson' rel="noreferrer" target='_blank'><img className='social-logo' src={GH_LOGO_PATH} alt="GitHub Logo" /></a></li>
                <li><a title="LinkedIn" href='https://www.linkedin.com/in/austin-lennert-619644236/' rel="noreferrer" target='_blank'><img className='social-logo' src={LI_LOGO_PATH} alt="LinkedIn Logo" /></a></li>
            </ul>
        )
    }
}

