import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import InfoBox from '../InfoBox'

configure({ adapter: new Adapter() });

describe('<InfoBox />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      address: 'Some Address',
      phone: '123-456-7890',
      email: 'Some Email',
    }
    component = shallow(<InfoBox { ...props } />);
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
