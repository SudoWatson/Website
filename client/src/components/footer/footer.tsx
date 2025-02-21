import React, { Component } from 'react';

import './footer.css';


import Links from '../links/links';


type Props = {};

type State = {};

const curYear = new Date().getFullYear();

export default class footer extends Component<Props, State> {

    render() {
        return (
            <div className="footer">
                <Links />
                <p>Austin Lennert &copy;2022-{curYear}</p>
            </div>
        )
    }
}