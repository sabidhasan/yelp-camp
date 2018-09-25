import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Select from '../Select'

configure({ adapter: new Adapter() });

describe('<Select />', () => {
  let component;
  let props;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
    props = {
      items: [
        {value: 1, text: 'First'},
        {value: 2, text: 'Second'},
        {value: 3, text: 'Third'}
      ],
      defaultText: 'Test Text',
      onChange
    }
    component = shallow(<Select { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Control is unexpanded upon load', () => {
    expect(component.find('.Select--expanded')).toHaveLength(0);
  });

  it('Value presented to user is default text upon load', () => {
    expect(component.find('.Select__current-value').text()).toBe('Test Text');
  });

  it('All items are presented to the user', () => {
    expect(component.find('.Select__item--main')).toHaveLength(3);
  });

  it('Clicking already-selected item does not change text', () => {
    component.find('.Select__item--first').simulate('click');
    expect(component.find('.Select__current-value').text()).toBe('Test Text');
  });

  it('Clicking already-selected item does not call callback function', () => {
    component.find('.Select__item--first').simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('Clicking a new item changes the displayed text', () => {
    component.find('.Select__item--main').first().simulate('click');
    expect(component.find('.Select__current-value').text()).toBe('First');
  });

  it('Clicking a new item calls callback function with correct argument', () => {
    component.find('.Select__item--main').first().simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(1);
  });

  it('Select component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
