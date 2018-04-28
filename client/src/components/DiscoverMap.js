import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import map from '../helpers/CanadaMap.svg'
import CanadaMapSVG from '../helpers/CanadaMapSVG'

const DiscoverMap = () => {
  return (
    <div style={{width: '60%', margin: '0 auto', background: 'white'}}>
      <CanadaMapSVG />
    </div>
  )
}

export default DiscoverMap
