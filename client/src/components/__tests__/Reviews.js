import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Reviews from '../Reviews'

configure({ adapter: new Adapter() });

describe('<Reviews />', () => {
  let component;
  let props;
  let deleteReview;

  beforeEach(() => {
    deleteReview = jest.fn();

    props = {
      comments: [
        {id: 1, photoURL: 'url', displayName: 'Name', rating: 3.3, time: 'October 1, 2018', deleteReview, text: 'Test', uid: '10'},
        {id: 2, photoURL: 'url', displayName: 'Name', rating: 3.3, time: 'October 1, 2018', deleteReview, text: 'Test', uid: '10'},
        {id: 3, photoURL: 'url', displayName: 'Name', rating: 3.3, time: 'October 1, 2018', deleteReview, text: 'Test', uid: '10'},
        {id: 4, photoURL: 'url', displayName: 'Name', rating: 3.3, time: 'October 1, 2018', deleteReview, text: 'Test', uid: '10'},
      ],
      deleteReview
    }
    component = shallow(<Reviews { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('If no comments, then `Be the first to review` message shown', () => {
    component.setProps({comments: undefined});
    expect(component.find('.Reviews__first')).toHaveLength(1)
  });

  it('Number of reviews shown is equal to number of comments', () => {
    expect(component.find('Review')).toHaveLength(4)
  })

  it('Reviews component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
