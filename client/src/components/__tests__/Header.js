import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from '../Header'

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let component;
  let props;
  const stickyClass = 'Custom-Class';
  const toggleCart = jest.fn();
  const toggleLoginForm = jest.fn();
  const signOut = jest.fn();

  beforeEach(() => {
    props = {
      toggleLoginForm,
      toggleCart
    }
    component = shallow(
      <Header { ...props } />)
      .find('Header')
      .shallow({context: {signOut, stickyClass, user: {loading: null, providerData: [{photoURL: null}]} }})
  });

  it('Component should be defined', () => {
    expect(Header).toBeDefined();
  });

  it('Header__login should be rendered once', () => {
    expect(component.find('.Header__login')).toHaveLength(1);
  })

  it('When user is logged in, button should say `Log Out`', () => {
    expect(component.find('.Header__login').text()).toBe('Log Out');
  })

  it('When user is logged in, button should call Log Out function', () => {
    component.find('.Header__login').simulate('click');
    expect(signOut).toHaveBeenCalled();
  })

  it('When user is logged out, button should show the log in form', () => {
    // Rerender the component with no user
    component = shallow(
      <Header { ...props } />)
      .find('Header')
      .shallow({context: {signOut, stickyClass, user: null }})

    component.find('.Header__login').simulate('click');
    expect(toggleLoginForm).toHaveBeenCalled()
  })

  it('When user is logged out, button should say `Sign In`', () => {
    // Rerender the component with no user
    component = shallow(
      <Header { ...props } />)
      .find('Header')
      .shallow({context: {signOut, stickyClass, user: null }})

    expect(component.find('.Header__login').text()).toBe('Sign In');
  })

  it('It should call Cart function if `View Cart` is clicked', () => {
    component.find('.Header__cart-icon').simulate('click');
    expect(toggleCart).toHaveBeenCalled();
  })

  it('Class name sticky is used when provided', () => {
    expect(component.find('nav').hasClass(stickyClass)).toBe(true)
  })

  it('Header component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
