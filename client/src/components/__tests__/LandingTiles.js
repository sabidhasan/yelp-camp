import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LandingTiles from '../LandingTiles'

configure({ adapter: new Adapter() });

describe('<LandingTiles />', () => {
  const component = shallow(<LandingTiles />)

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('LandingTiles component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
