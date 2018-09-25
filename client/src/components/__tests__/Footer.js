import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from '../Footer'

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Footer />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Footer component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
