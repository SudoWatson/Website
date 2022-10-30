import React, { Component } from 'react';

import './projects.css';

import Project from './project/project';

type Props = {};

type State = {};

export default class projects extends Component<Props, State> {

  render() {
    // TODO Get this any outta here
    const projectDivs: any[] = [];

    projectData.forEach((proj: ProjectProps) => {
        projectDivs.push(<Project {...proj} />)
    })

    return (
        <>
      <div id='Projects' className='snap-to'>
        <p className="comment">// Projects</p>
        <div id="projectContainer">
            {projectDivs}
        </div>
      </div>
      </>
    )
  }
}

// TODO Clean this up

type ProjectProps = {
    title?: string,
    imgPath?: string,
    desc?: string,
    repoURL?: string | null,
    demoURL?: string | null,
    on?: boolean
  };


const projectData = [
    {
        title: "Test Project",
        imgPath: "https://picsum.photos/700/525",
        desc: "Just a quick tester boilerplate for projects",
        repoURL: null,
        demoURL: null,
    },
    {
        title: "Secondary Project",
        imgPath: "https://picsum.photos/701/525",
        desc: "Just a quick tester boilerplate for projects",
        repoURL: null,
        demoURL: null,
    }
]
