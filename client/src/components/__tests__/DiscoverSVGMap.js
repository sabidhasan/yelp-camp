import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DiscoverSVGMap from '../DiscoverSVGMap'

configure({ adapter: new Adapter() });

const getEventObject = (type, classList) => {
  return {
    target: {
      tagName: 'path',
      classList,
    },
    ...type
  }
}

describe('<DiscoverSVGMap />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      history: [],
    }
    component = shallow(<DiscoverSVGMap { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Clicking a province navigates to that province', () => {
    const event = getEventObject({button: 0}, ['a', 'ab']);
    component.find('.DiscoverSVGMap').simulate('click', event);
    expect(props.history.pop()).toBe('/discover/ab');
  })

  it('Right clicking a province does not do anything', () => {
    const event = getEventObject({button: 2}, ['a', 'ab']);
    component.find('.DiscoverSVGMap').simulate('click', event);
    expect(props.history.length).toBe(0);
  })

  it('Clicking on a non-province does not do anything', () => {
    const event = getEventObject({button: 0}, []);
    component.find('.DiscoverSVGMap').simulate('click', event);
    expect(props.history.length).toBe(0);
  })

  it('On page load, the scrolling list is shown', () => {
    expect(component.find('.DiscoverSVGMap__scroll')).toHaveLength(1);
  })

  it('Mousing over a province updates shown text', () => {
    const event = getEventObject({}, ['a', 'b', 'bc']);
    component.find('.DiscoverSVGMap').simulate('mouseOver', event);
    expect(component.find('.DiscoverSVGMap__map-text').text()).toBe('Discover british columbia Campgrounds');
  })

  it('Mousing out of province shows scrolling list again', () => {
    component.setState({hoveredProvince: {}});
    component.find('.DiscoverSVGMap').simulate('mouseOut');
    expect(component.find('.DiscoverSVGMap__scroll')).toHaveLength(1);
  })

  it('Pressing Enter navigates to page if it exists', () => {
    const event = getEventObject({which: 13}, ['a', 'b', 'on']);
    component.find('.DiscoverSVGMap').simulate('keydown', event);
    expect(props.history.pop()).toBe('/discover/on');
  })

  it('Pressing non-Enter key does not navigate anywhere else', () => {
    const event = getEventObject({which: 14}, ['a', 'b', 'on']);
    component.find('.DiscoverSVGMap').simulate('keydown', event);
    expect(props.history.pop()).toBe(undefined);
  })

  it('DiscoverSVGMap component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
