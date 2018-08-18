import React from 'react'

const LandingText = () => (
    <div className='LandingText'>
      <section className='LandingText__section'>
        <h2 className='LandingText__title flex-center'>Truly Canadian</h2>
        <p className='LandingText__text'>We list campgrounds from across Canada - from day trips
         in Ontario, to secluded sites in the Yukon.</p>
      </section>
      <section className='LandingText__section'>
        <h2 className='LandingText__title flex-center'>Save Time <i className="fas fa-clock" aria-hidden='true'></i></h2>
        <p className='LandingText__text'>Detailed information for each campground means you spend
        less time searching, and more time camping!</p>
      </section>
      <section className='LandingText__section'>
        <h2 className='LandingText__title flex-center'>Unfiltered Reviews <i className="fas fa-filter" aria-hidden='true'></i></h2>
        <p className='LandingText__text'>We offer unbiased reviews for each campground so you can truly
        decide what's worth visiting in your limited summer.</p>
      </section>
    </div>
  )

export default LandingText
