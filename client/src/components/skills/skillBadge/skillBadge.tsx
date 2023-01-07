import React, { Component } from 'react'

import './skillBadge.css';

type Props = SkillData;

type State = {}

export default class skillBadge extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="skill-badge">
        <img src={this.props.imageURL} alt={this.props.name || "Skill Badge Icon"} />
        <p className="skill-name">{this.props.name || ""}</p>
      </div>
    )
  }
}