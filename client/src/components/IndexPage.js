import React from 'react'

import Banner from './Banner'
import LandingText from './LandingText'
import LandingTiles from './LandingTiles'
import DiscoverTile from './DiscoverTile'
import Campgrounds from './Campgrounds'

const IndexPage = (props) => {
  return (
    <React.Fragment>
      <Banner {...props} />
      <LandingText {...props} />
      <LandingTiles {...props} />
      <DiscoverTile {...props}/>
      <Campgrounds {...props} />
    </React.Fragment>
  )
};

export default IndexPage
