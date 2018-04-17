import React from 'react'

const Activities = (props) => {
  console.log(props.activitiesList);
  if (!(props.activitiesList)) return null;

  return props.activitiesList.map((activity, idx) => {
    //make into li
    return (<li key={idx}>
      <span className='activity__logo'>{activity.logo}</span>
      <span className='activity__name'>{activity.name}</span>
    </li>)
  });
}

export default Activities
