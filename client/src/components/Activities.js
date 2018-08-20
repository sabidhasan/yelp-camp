import React from 'react'
import PropTypes from 'prop-types';

const Activities = (props) => {
  if (!(props.activitiesList)) return null;

  return (
    <ul className='Activities' role='table'>
      {props.activitiesList.map((activity, idx) => (
        <li role='cell' className='Activities__activity flex-center' key={idx}>
          <span className='Activities__logo'>{activity.logo}</span>
          <span className='Activities__name bold'>{activity.name}</span>
        </li>
      ))}
    </ul>
  )
}

Activities.propTypes = {
  activitiesList: PropTypes.array
}

export default Activities
