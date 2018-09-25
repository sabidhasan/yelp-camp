import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReviewButton from '../ReviewButton'


configure({ adapter: new Adapter() });

describe('<ReviewButton />', () => {
  let component;
  let props;
  const toggleReviewForm = jest.fn();

  beforeEach(() => {
    props = { toggleReviewForm }
    component = shallow(<ReviewButton { ...props } />)
  });

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Callback function called on click', () => {
    component.find('.ReviewButton').simulate('click');
    expect(toggleReviewForm).toHaveBeenCalledTimes(1);
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
