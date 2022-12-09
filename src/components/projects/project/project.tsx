import React, { Component } from 'react';

import './project.css';

type Tag = 'HTML' | 'Java';

type Props = ProjectData;


/**
 * @param {boolean} isPopUpVis - Boolean of whether or not the project popup is visible
 * @param {boolean} isHovering - Boolean of whether or not the mouse is hovering over the project thumbnail
 */
type State = {
  isPopUpVis: boolean,
  isHovering: boolean,
};

// TODO Project and Skill need to have a key
export default class project extends Component<Props, State> {
  state: State;
  
  constructor(props: Props, state: State) {
    super(props, state);
    
    this.state = {
      isPopUpVis: false,
      isHovering: false,
    };


    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  render() {
      // TODO Shadow still isn't lining up nicely
      return (
      <>
        <div id="ProjectThumbnail" onClick={this.onClick} >
          <img src={this.props.imgPath} alt="Test Pic" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}/>
          {this.state.isHovering &&
          <p id='thumbnailTitle'>{this.props.title}</p>
          }
        </div>
        {this.state.isPopUpVis &&
        <div id="ProjectPopup">
          <h4 id='closePopUp' onClick={this.onClick}>X</h4>
          
          <img src={this.props.imgPath} alt="Project Thumbnail" />
          <h3 id="title">{this.props.title}</h3>
          <div id="aboutProject">
            <h3>About</h3>
            <p>{this.props.desc}</p>
          </div>
          <div id="projectTags">
            Test
            HTML
            JAVA
            JS
            CSS
          </div>
          <div id="buttons">
            <a href={this.props.demoURL || "#"} rel="noreferrer" target='_blank'>
              <button><span className="material-symbols-outlined visibility">visibility</span>Demo</button>
            </a>
            <a href={this.props.repoURL || "#"} rel="noreferrer" target='_blank'>
              <button><span className="material-symbols-outlined code">code</span>Code</button>
            </a>
          </div>
        </div>
        }
      </>
    )
  }

  onClick() {
    this.setState({
      isPopUpVis: !this.state.isPopUpVis,
    });
  }

  onMouseOver() {
    this.setState({
      isHovering: true,
    })
  }

  onMouseLeave() {
    this.setState({
      isHovering: false,
    })
  }
}