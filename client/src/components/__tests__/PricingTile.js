import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PricingTile from '../PricingTile'

configure({ adapter: new Adapter() });

describe('<PricingTile />', () => {
  let component;
  let props;
  const type = 'Title'

  beforeEach(() => {
    props = {
      data: {prices: null},
      type
    }
    component = shallow(<PricingTile { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Header element shows heading', () => {
    expect(component.find('h3').text()).toBe('Title');
  });

  it('Sidebar shows error message when no pricing provided', () => {
    expect(component.find('.Sidebar__text').text()).toBe(`No ${type} pricing provided`);
  });

  it('If pricing of type not provided, then it shows None', () => {
    props = {
      data: {prices: {Title: null}},
      type
    }
    component = shallow(<PricingTile { ...props } />)
    expect(component.find('.Sidebar__text').text()).toBe('None');
  });

  it('Single price is rendered correctly', () => {
    props = {
      data: {prices: {Title: [50]}},
      type
    }
    component = shallow(<PricingTile { ...props } />)
    expect(component.find('.Sidebar__text').text()).toBe('$50');
  });

  it('Price range is rendered correctly', () => {
    props = {
      data: {prices: {Title: [50, 100]}},
      type
    }
    component = shallow(<PricingTile { ...props } />)
    expect(component.find('.Sidebar__text').text()).toBe('$50 - $100');
  });

 it('LoginForm component snapshot matches what is expected', () => {
   expect(toJson(component)).toMatchSnapshot();
 });
 
});
