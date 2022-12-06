import React, { Component } from 'react';

import './projects.css';

import Project from './project/project';

import projectData from '../../projectData/projects';

type Props = {};

type State = {};

export default class projects extends Component<Props, State> {

  render() {
    // TODO Get this any outta here
    const projectDivs: any[] = [];

    projectData.forEach((proj: ProjectData) => {
        projectDivs.push(<Project {...proj} />)
    })

    return (
        <>
      <div id='Projects' className='snap-to'>
        {/* eslint-disable-next-line*/}
        <p className="comment">// Projects</p>
        <div id="projectContainer">
            {projectDivs}
        </div>
      </div>
      </>
    )
  }
}
