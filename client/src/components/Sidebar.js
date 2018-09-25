import React from 'react'
import PropTypes from 'prop-types'
import PricingTile from './PricingTile'

const Sidebar = (props) => {
  const paymentLogos = {'interac': '💳', cash: '💵'};
  const filteredSeasonalHrs = props.hours ? props.hours.seasonal.filter(v => !!v) : undefined
  return (
    <aside
      className='Sidebar'
    >
      <section className='Sidebar__section'>
        <h2 className='Sidebar__heading'>Hours</h2>
        <div className='Sidebar__details'>
          {props.hours && props.hours.daily ?
            <React.Fragment>
              <h3 className='Sidebar__subheading Sidebar__daily'>Daily</h3>
              <div className='Sidebar__text'>{props.hours.daily}</div>
            </React.Fragment>
          : <div className='Sidebar__text'>No daily hours for this campground</div>}
          {props.hours && filteredSeasonalHrs.length ?
            <React.Fragment>
              <h3 className='Sidebar__subheading Sidebar__seasonal'>Seasonal</h3>
              <div className='Sidebar__text Sidebar__seasonal-text'>
                {filteredSeasonalHrs.join(' to ')}
              </div>
            </React.Fragment>
          : <div className='Sidebar__text'>No seasonal hours for this campground</div>}
        </div>
      </section>

      <section className='Sidebar__section'>
        <h2 className='Sidebar__heading'>Camp Sites</h2>
        <div className='Sidebar__details'>
          <div className='Sidebar__text Sidebar__campsites'>
            {props.campsites || `No details on how many campsites at this location`}
          </div>
        </div>
      </section>

      <section className='Sidebar__section'>
        <h2 className='Sidebar__heading'>Prices</h2>
        <div className='Sidebar__details'>
          <h3 className='Sidebar__subheading'>Visitors</h3>
          <div className='Sidebar__text Sidebar__pricing'>
            {props.prices ? (props.prices.visitors || 'Free')
            : 'No visitor pricing provided'}
          </div>
          <PricingTile type='daily' data={props} />
          <PricingTile type='weekly' data={props} />
          <PricingTile type='seasonal' data={props} />

          <div className='Sidebar__text'>{props.prices ? props.prices.description : ''}</div>
        </div>
      </section>

      <section className='Sidebar__section'>
        <h2 className='Sidebar__heading'>Payment Methods</h2>
        <div className='Sidebar__text'>
          {props.paymentMethods && props.paymentMethods.length
            ? props.paymentMethods.map((val, idx) => (
                <h2 className='Sidebar__payment' key={idx}>
                  {paymentLogos[val] || ''} {val}
                </h2>
              ))
            : 'No payment method information found'
          }
        </div>
      </section>
    </aside>
  )
}

Sidebar.propTypes = {
    hours: PropTypes.object,
    campsites: PropTypes.number,
    prices: PropTypes.object,
    paymentMethods: PropTypes.array
}

export default Sidebar
