import React from 'react'

const Activities = (props) => {
  if (!(props.activitiesList)) return null;

  return (
    <ul className='Activities'>
      {props.activitiesList.map((activity, idx) => (
        <li className='Activities__activity flex-center' key={idx}>
          <span className='Activities__logo'>{activity.logo}</span>
          <span className='Activities__name bold'>{activity.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default Activities
