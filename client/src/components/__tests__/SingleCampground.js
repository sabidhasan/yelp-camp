import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleCampground from '../SingleCampground'

configure({ adapter: new Adapter() });

describe('<SingleCampground />', () => {
  let component;
  let props;
  let addToCart;
  let toggleLoginForm;
  const comments = [{rating: 4}, {rating: 2}, {rating: 1}, {rating: 4}];

  beforeEach(() => {
    toggleLoginForm = jest.fn();
    addToCart = jest.fn();
    props = {
      match: {
        params: {id: 10}
      },
      addToCart,
      toggleLoginForm
    }
    const state = {
      comments,
      name: 'Sample Name', description: 'This is a description of the campground',
      region: 'Region', province: 'Province'
    }
    component = shallow(
      <SingleCampground { ...props } />, {
        context: {
          startLoad: jest.fn(), finishLoad: jest.fn(), user: {loading: false}
        }
      });
    component.setState(state)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  })

  it('Clicking add to cart calls addToCart function', () => {
    component.find('.SingleCampground__cart').simulate('click')
    expect(addToCart).toHaveBeenCalledTimes(1);
  });

  it('SingleCampground__description exists when AJAX request is made', () => {
    expect(component.find('.SingleCampground__description')).toHaveLength(1);
  });

  it('Reviews are properly pluralized for >1 reviews', () => {
    expect(component.find('.SingleCampground__rating-count').text()).toBe('4 Reviews');
  });

  it('Reviews are properly pluralized for 1 review', () => {
    component.setState({
      comments: [{rating: 4}]
    });
    expect(component.find('.SingleCampground__rating-count').text()).toBe('1 Review');
  });

  it('Reviews are properly pluralized for 0 reviews', () => {
    component.setState({
      comments: []
    });
    expect(component.find('.SingleCampground__rating-count').text()).toBe('No Reviews');
  });

  it('Name is displayed', () => {
    expect(component.find('.SingleCampground__activities-header').text()).toBe('Activities at Sample Name');
  });

  it('Adding a new comment adds it to internal state', () => {
    component.instance().addNewComment({rating: 1})
    expect(component.state('comments').length).toBe(5);
  });

  it('RatingBar\'s rating props is calculated based on reviews', () => {
    const calculatedRating = comments.reduce((acc, val) => (acc + val.rating), 0) / comments.length
    expect(component.find('RatingBar').prop('rating')).toBe(calculatedRating)
  })

  it('NewReviewForm does not exist initially (form hidden on load)', () => {
    expect(component.find('NewReviewForm')).toHaveLength(0)
  })

  it('NewReviewForm exists when toggle button is clicked and user is logged in', () => {
    // Call toggle button press (done from child component in the app)
    component.instance().toggleReviewForm(null, true);
    expect(component.find('NewReviewForm')).toHaveLength(1)
  });

  it('NewReviewForm doesn\'t exist when toggle button is clicked and user is logged out', () => {
    // Rerender component with no user
    component = shallow(
      <SingleCampground { ...props } />, {
        context: {
          startLoad: jest.fn(), finishLoad: jest.fn(), user: undefined
        }
      });
    // Try to toggle review form
    component.instance().toggleReviewForm(null, true);
    // Review form should be hidden, since user isnt logged in
    expect(component.find('NewReviewForm')).toHaveLength(0);
  })

  it('toggleLoginForm function is called when toggle button is clicked and user is logged out', () => {
    // Rerender component with no user
    component = shallow(
      <SingleCampground { ...props } />, {
        context: {
          startLoad: jest.fn(), finishLoad: jest.fn(), user: undefined
        }
      });
    component.instance().toggleReviewForm(null, true);
    expect(toggleLoginForm).toHaveBeenCalledTimes(1);
  });

  it('SingleCampground component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
