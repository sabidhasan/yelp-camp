import React from 'react'

const Activities = (props) => {
  if (!(props.activitiesList)) return null;

  return props.activitiesList.map((activity, idx) => {
    //make into li
    return (<li key={idx}>
      <span className='activity__logo'>{activity.logo}</span>
      <span className='activity__name capitalize'>{activity.name}</span>
    </li>)
  });
}

export default Activities
