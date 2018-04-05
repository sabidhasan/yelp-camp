import React from 'react'

const Activities = (props) => {
  return props.activitiesList.map((activity, idx) => {
    //make into li
    <li key={idx}> 
      <span className='activity__logo'>activity.logo</span>
      <span className='activity__name'>activity.name</span>
    </li>
  });
}

export default Activities
