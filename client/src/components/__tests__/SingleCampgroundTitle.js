import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleCampgroundTitle from '../SingleCampgroundTitle'

configure({ adapter: new Adapter() });

describe('<SingleCampgroundTitle />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      name: 'Title',
      region: 'Test'
    }
    component = mount(<SingleCampgroundTitle { ...props } />, {context: {stickyClass: 'sampleClass'}})
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Region text should be correctly displayed', () => {
    expect(component.find('.SingleCampgroundTitle').text()).toBe('Title');
  });

  it('Region text should be correctly displayed', () => {
    expect(component.find('.SingleCampgroundTitle__region').text()).toBe('Test Region');
  });

  it('SingleCampgroundTitle component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
