import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DiscoverCampgroundTile from '../DiscoverCampgroundTile'

configure({ adapter: new Adapter() });

describe('<MultiCheckBox />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      cg: {lat: 20, lon: 20},
      userLocation: {latitude: 19, longitude: 19}
    }
    component = shallow(<DiscoverCampgroundTile { ...props } />)
  })

  it('If no location supplied, then return null', () => {
    props = {
      cg: null,
      userLocation: {latitude: 19, longitude: 19}
    }
    component = shallow(<DiscoverCampgroundTile { ...props } />)
    expect(component.html()).toBe(null)
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
