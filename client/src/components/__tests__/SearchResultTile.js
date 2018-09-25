import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchResultTile from '../SearchResultTile'

configure({ adapter: new Adapter() });

const generateProps = (key, value) => {
  let tmpProps = {
    id: 4,
    number: 5,
    name: 'Test Name',
    regionAndProvince: 'Region, Province',
    address: '123 Main St, City, PR',
    distance: 10,
    description: 'Some description',
    images: ['source'],
    rating: 5,
    comments: [
      {1: 'one'}, {2: 'one'}, {3: 'one'}, {4: 'one'}
    ]
  }
  if (key) tmpProps[key] = value;
  return tmpProps;
}

describe('<SearchResultTile />', () => {
  let component;
  let props;

  beforeEach(() => {
    const onTitleHover = jest.fn();
    props = { ...generateProps(), onTitleHover }
    component = shallow(<SearchResultTile { ...props } />)
  });

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Distance is not shown, if it is non-existent', () => {
    props['distance'] = undefined;
    component = shallow(<SearchResultTile { ...props } />)
    expect(component.find('.SearchResultTile__distance').text()).toBe('')
  });

  it('If no images supplied, none are shown', () => {
    props['images'] = undefined;
    component = shallow(<SearchResultTile { ...props } />)
    expect(component.find('.SearchResultTile__image').prop('src')).toBe(null)
  });

  it('Proper number of reviews are shown', () => {
    expect(component.find('.SearchResultTile__rating-count').text()).toBe('4 Reviews');
  });

  it('When there is one review, the length is properly shown', () => {
    props['comments'] = [{1: 's'}];
    component = shallow(<SearchResultTile { ...props } />)
    expect(component.find('.SearchResultTile__rating-count').text()).toBe('1 Review');
  });

  it('When there are no reviews, the length is properly shown', () => {
    props['comments'] = undefined;
    component = shallow(<SearchResultTile { ...props } />)
    expect(component.find('.SearchResultTile__rating-count').text()).toBe('No Reviews');
  });

  it('Hovering over title element calls the callback function with correct ID', () => {
    component.find('.SearchResultTile__title-container').simulate('mouseenter')
    expect(props.onTitleHover).toBeCalledWith(4)
  })

  it('Hovering out of title element calls callback function with null', () => {
    component.find('.SearchResultTile__title-container').simulate('mouseleave')
    expect(props.onTitleHover).toBeCalledWith(null)
  })

  it('Snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
})
