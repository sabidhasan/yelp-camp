import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Review from '../Review'

configure({ adapter: new Adapter() });

describe('<Review />', () => {
  let component;
  let props;
  let deleteReview;

  beforeEach(() => {
    deleteReview = jest.fn();
    props = {
      photoURL: 'URL',
      displayName: 'Some Name',
      rating: 3.2,
      time: 'Tuesday April 10, 2018',
      uid: '10',
      text: 'Text',
      deleteReview
    }
    component = shallow(<Review { ...props } />, {context: {user: {uid: 50}}})
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Review__delete now shown when uid different from props ID', () => {
    expect(component.find('.Review__delete')).toHaveLength(0)
  })

  it('The delete function is called when Review__delete is clicked', () => {
    component.setContext({
      user: {uid: '10'}
    });
    component.find('.Review__delete').simulate('click')
    expect(deleteReview).toHaveBeenCalledTimes(1)
  });

  it('Time is properly formattted', () => {
    expect(component.find('.Review__time-stamp').text()).toBe('10 April 2018')
  });

  it('Review component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
