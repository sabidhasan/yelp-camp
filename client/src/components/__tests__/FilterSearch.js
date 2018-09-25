import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterSearch from '../FilterSearch'


configure({ adapter: new Adapter() });

describe('<MultiCheckBox />', () => {
  let component;
  let props;
  const onChange = jest.fn();
  const className = 'Test-Class'

  beforeEach(() => {
    props = {
      onChange,
      className,
      filterCriteria: {
        maxDistance: 2,
        regions: [1, 2, 3, 4],
        provinces: [1, 2, 3, 4],
        activities: [1, 2, 3, 4]
      },
      items: ['First', 'Second', 'Third'],
      defaultText: 'Test Text',
    }
    component = shallow(<FilterSearch { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Prop classname is added to DOM element', () => {
    expect(component.find(`.${className}`)).toHaveLength(1);
  });

  it('Button text says "show"', () => {
    expect(component.find('.FilterSearch__button').text()).toBe('Show Filters');
  });

  it('When clicked, button text says "hide"', () => {
    component.find('.FilterSearch__button').simulate('click');
    expect(component.find('.FilterSearch__button').text()).toBe('Hide Filters');
  });

  it('When clicked, button text says "hide"', () => {
    component.find('.FilterSearch__button').simulate('click');
    expect(component.find('.FilterSearch__tiles--expanded')).toHaveLength(1);
  });

  it('When maxDistance is greater than 0, show InputRange', () => {
    expect(component.find('InputRange')).toHaveLength(1);
  });

  it('When maxDistance is equal to 0, do not show InputRange', () => {
    props = {
      onChange,
      filterCriteria: {
        maxDistance: 0, regions: [1, 2, 3, 4],
        provinces: [1, 2, 3, 4], activities: [1, 2, 3, 4]
      }
    }
    component = shallow(<FilterSearch { ...props } />)
    expect(component.find('InputRange')).toHaveLength(0);
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
