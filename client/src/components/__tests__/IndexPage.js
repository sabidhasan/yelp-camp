import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import IndexPage from '../IndexPage'

configure({ adapter: new Adapter() });

describe('<IndexPage />', () => {
  let component;
  let props = {};

  beforeEach(() => {
    component = shallow(<IndexPage { ...props } />)
  })

  it('IndexPage should be defined', () => {
    expect(component).toBeDefined();
  });

  it('IndexPage component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
