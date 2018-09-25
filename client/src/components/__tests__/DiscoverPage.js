import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DiscoverPage from '../DiscoverPage'

configure({ adapter: new Adapter() });

describe('<DiscoverPage />', () => {
  let component;
  let props;
  let context;

  beforeEach(() => {
    props = {
      match: {params: {province: 'ab'}},
      history: [],
    }
    component = shallow(<DiscoverPage { ...props } />, {context: {userLocation: {}}})
    // Fake the AJAX call and set component state directly
    component.setState({
      campgrounds: [
        {id: 1}, {id: 2}, {id: 3}
      ]
    })
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Null is returned when no AJAX call is made', () => {
    component.setState({ campgrounds: null })
    expect(component.html()).toBe(null);
  })

  it('If an invalid province is given, redirect to home page', () => {
    // Make an invalid province
    props.match.params.province = 'FF'
    component = shallow(<DiscoverPage { ...props } />)
    expect(props.history[0]).toBe('/');
  })

  it('Header element displays province name', () => {
    expect(component.find('.Discover__province').text()).toBe('alberta')
  })

  it('Discover length has correct length', () => {
    expect(component.find('.Discover__length').text()).toBe('3')
  })

  it('No DiscoverCampgroundTile exists when component loads (no campground selected)', () => {
    expect(component.find('DiscoverCampgroundTile')).toHaveLength(0)
  })

  it('When setSelected is called with valid CG id, DiscoverCampgroundTile is shown ', () => {
    component.instance().setSelected(2);
    expect(component.find('DiscoverCampgroundTile')).toHaveLength(1)
  })

  it('Calling setSelected with invalid CG id, hides DiscoverCampgroundTile', () => {
    component.instance().setSelected(5);
    expect(component.find('DiscoverCampgroundTile')).toHaveLength(0)
  })

  it('DiscoverPage component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
