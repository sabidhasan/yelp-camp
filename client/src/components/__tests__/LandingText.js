import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LandingText from '../LandingText'

configure({ adapter: new Adapter() });

describe('<LandingText />', () => {
  const component = shallow(<LandingText />)

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('LandingText component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
