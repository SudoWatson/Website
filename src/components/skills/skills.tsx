import React, { Component } from 'react'

import './skills.css';

import SkillBadge from './skillBadge/skillBadge';

import skillsData from '../../projectData/skills';

type Props = {}

type State = {}

export default class skills extends Component<Props, State> {
  state = {}

  render() {
    // TODO Get this any outta here
    const skillDivs: any[] = [];

    skillsData.forEach((skill: SkillData) => {
        skillDivs.push(<SkillBadge {...skill} />)
    })

    return (
      <div id="Skills" className='snap-to'>
        {/* eslint-disable-next-line*/}
        <p className="comment">// Skills</p>
        <div id="skillBadges">
            {skillDivs}
        </div>
      </div>
    )
  }
}