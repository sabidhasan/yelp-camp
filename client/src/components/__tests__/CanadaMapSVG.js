import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CanadaMapSVG from '../../helpers/CanadaMapSVG'

configure({ adapter: new Adapter() });

describe('<CanadaMapSVG />', () => {
  const component = shallow(<CanadaMapSVG />);

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
