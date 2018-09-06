import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from '../Cart.js'

configure({ adapter: new Adapter() });


describe('<Cart />', () => {
  let component;
  let props;
  const item = {id: 0, name: 'Test Name', image: 'img-src', region: 'Test Region', province: 'PR'}
  const toggleCart = jest.fn();

  beforeEach(() => {
    props = {
      cart: {
        items: [ item ]
      },
      toggleCart
    }
    component = shallow(<Cart { ...props } />, { context: { user: {displayName: 'Abid'} } })
  })

  it('Component should be defined', () => {
    expect(Cart).toBeDefined();
  });

  it('Should have a main .Cart element', () => {
    expect(component.find('.Cart')).toHaveLength(1);
  });

  it('.Cart__message should have proper text for one campground', () => {
    expect(component.find('.Cart__message-count').text()).toBe("1")
  });

  it('.Cart__message should have proper text for 3 campgrounds', () => {
    props.cart.items.push(item)
    component.setProps({...props})
    expect(component.find('.Cart__message-count').text()).toBe("2")
  });

  it('.Cart__message should have proper text for no campgrounds', () => {
    props.cart.items = [];
    component.setProps({...props})
    expect(component.find('.Cart__message-count').text()).toBe("no")
  });

  it('User name, when set, is correctly displayed', () => {
    expect(component.find('.Cart__header').text()).toBe("Abid's Cart")
  });

  it('User name, when unset, is displayed as Guest', () => {
    component = shallow(<Cart { ...props } />)
    expect(component.find('.Cart__header').text()).toBe("Guest's Cart")
  });

  it('Cart component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
