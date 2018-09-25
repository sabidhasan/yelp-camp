import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import toJson from 'enzyme-to-json'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CampgroundTile from '../CampgroundTile'

configure({ adapter: new Adapter() });

describe('<CampgroundTile />', () => {
  let component;
  let props;
  const image = 'image_url'
  const signIn = jest.fn();

  beforeEach(() => {
    props = {
      ratingCount: 5,
    }
    component = shallow(<CampgroundTile { ...props } />);
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CampgroundTile correctly indicates number of reviews', () => {
    expect(component.find('.CampgroundTile__review-count').text()).toBe('5 Reviews')
  });

  it('CampgroundTile correctly indicates number of reviews (when no reviews)', () => {
    props = { ratingCount: 0 }
    component = shallow(<CampgroundTile { ...props } />);
    expect(component.find('.CampgroundTile__review-count').text()).toBe('No reviews yet')
  });

  it('CampgroundTile component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
