import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginForm from '../LoginForm'

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  let component;
  let props;
  const signIn = jest.fn();

  beforeEach(() => {
    component = shallow(<LoginForm { ...props } />, {context: {signIn}})
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Google Sign In should be called when button pressed', () => {
    component.find('.LoginForm__google').simulate('click');
    expect(signIn).toHaveBeenCalled();
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
