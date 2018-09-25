import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DiscoverTile from '../DiscoverTile'

configure({ adapter: new Adapter() });

describe('<DiscoverTile />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DiscoverTile />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('DiscoverTile component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
