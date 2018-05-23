import React from 'react'

const LandingTiles = () => {
  return (
    <div className='LandingTiles LandingText'>
      <section className='LandingTiles__section LandingText__section'>
        <i className="LandingTiles__icon fas fa-home"></i>
        <h2 className='LandingTiles__number bold'>1550</h2>
        <p className='LandingTiles__text'>Unique Campgrounds</p>
      </section>

      <section className='LandingTiles__section LandingText__section'>
        <i className="LandingTiles__icon far fa-bookmark"></i>
        <h2 className='LandingTiles__number bold'>1</h2>
        <p className='LandingTiles__text'>Easy-to-Use Source</p>
      </section>

      <section className='LandingTiles__section LandingText__section'>
        <i className="LandingTiles__icon far fa-map"></i>
        <h2 className='LandingTiles__number bold'>12</h2>
        <p className='LandingTiles__text'>Provinces and Territories</p>
      </section>
    </div>
  )
}

export default LandingTiles
