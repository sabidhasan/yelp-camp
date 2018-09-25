import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RatingBar from '../RatingBar'

configure({ adapter: new Adapter() });

describe('<RatingBar />', () => {
  let component;
  let props;
  let updateRating;

  beforeEach(() => {
    updateRating = jest.fn();
    props = {
      updateRating,
      small: true,
      rating: 3
    }
    component = shallow(<RatingBar { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  })

  it('Right arrow key with rating < 5 calls updateRating function with new rating', () => {
    component.instance().handleKeyboard({key: 'ArrowRight'})
    expect(updateRating).toBeCalledWith(4)
  });

  it('Right arrow key with rating = 5 does not call updateRating function', () => {
    // Update the rating
    component.setProps({rating: 5})
    component.instance().handleKeyboard({key: 'ArrowRight'})
    expect(updateRating).toHaveBeenCalledTimes(0);
  });

  it('Left arrow key with rating > 0 calls updateRating function with new rating', () => {
    component.instance().handleKeyboard({key: 'ArrowLeft'})
    expect(updateRating).toBeCalledWith(2)
  });

  it('Left arrow key with rating of <= 0 does not call updateRating function', () => {
    // Update the rating
    component.setProps({rating: 0})
    component.instance().handleKeyboard({key: 'ArrowLeft'})
    expect(updateRating).toHaveBeenCalledTimes(0);
  });

  it('Ratingbar--editable exists', () => {
    expect(component.find('.RatingBar--editable')).toHaveLength(1)
  })

  it('Ratingbar--editable does not exist when updateRating is not supplied', () => {
    component.setProps({updateRating: null})
    expect(component.find('.RatingBar--editable')).toHaveLength(0)
  })

  it('RatingBar__star--small is shown when small prop passed', () => {
    expect(component.find('.RatingBar__star--small')).toHaveLength(5)
  });

  it('RatingBar__star--small is hidden when small prop not passed', () => {
    component.setProps({small: false})
    expect(component.find('.RatingBar__star--small')).toHaveLength(0)
  });

  it('Clicking RatingBar__star calls the updateRating function', () => {
    component.find('.RatingBar__star').at(3).simulate('click');
    expect(updateRating).toBeCalledWith(4)
  });

  it('Rating of 2 produces two .star100 elements, and 3 .star0 elements', () => {
    component.setProps({rating: 2})
    expect(component.find('.star100')).toHaveLength(2);
    expect(component.find('.star0')).toHaveLength(3);
  })

  it('Rating of 0 produces five .star0 elements', () => {
    component.setProps({rating: 0})
    expect(component.find('.star0')).toHaveLength(5);
  })

  it('Decimal rating produces proper elements (no rouding errors)', () => {
    component.setProps({rating: 3.4});
    expect(component.find('.star100')).toHaveLength(3);
    expect(component.find('.star40')).toHaveLength(1);
  })

  it('Greater than 5 rating rounds off to 5 stars', () => {
    component.setProps({rating: 9.4});
    expect(component.find('.star100')).toHaveLength(5);
  })

  it('Negative rating shows as 0 stars', () => {
    component.setProps({rating: -9.4});
    expect(component.find('.star0')).toHaveLength(5);
  })

  it('Illogically precise rating produces proper elements', () => {
    component.setProps({rating: 4.4238722});
    expect(component.find('.star100')).toHaveLength(4);
    expect(component.find('.star40')).toHaveLength(1);
  })

  it('RatingBar component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
