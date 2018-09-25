import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Sidebar from '../Sidebar'

configure({ adapter: new Adapter() });

describe('<Sidebar />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      hours: {daily: [], seasonal: ['1', '2']},
      campsites: undefined,
      prices: {},
      paymentMethods: ['interac', 'cash', 'cash']
    }
    component = shallow(<Sidebar { ...props } />)
  });

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Sidebar doesnt show daily hours if not given props', () => {
    component.setProps({hours: {daily: undefined, seasonal: []}})
    expect(component.find('.Sidebar__daily')).toHaveLength(0);
  });

  it('Sidebar doesnt show seasonal hours if no seasonal hours given', () => {
    component.setProps({hours: {daily: undefined, seasonal: []}})
    expect(component.find('.Sidebar__seasonal')).toHaveLength(0);
  });

  it('Component should be defined', () => {
    expect(component.find('.Sidebar__seasonal-text').text()).toBe('1 to 2');
  });

  it('Sidebar doesnt show seasonal hours if no seasonal hours given', () => {
    component.setProps({campsites: 20})
    expect(component.find('.Sidebar__campsites').text()).toBe('20');
  });

  it('If no visitor pricing information provided, default to `Free`', () => {
    expect(component.find('.Sidebar__pricing').text()).toBe('Free')
  })

  it('If visitor pricing information is provided then show pricing', () => {
    component.setProps({prices: {visitors: 10}})
    expect(component.find('.Sidebar__pricing').text()).toBe('10')
  })

  it('Number of payment methods matches what is provided via props', () => {
    expect(component.find('.Sidebar__payment')).toHaveLength(3)
  })

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
