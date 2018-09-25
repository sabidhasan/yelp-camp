import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MultiCheckBox from '../MultiCheckBox'

configure({ adapter: new Adapter() });

describe('<MultiCheckBox />', () => {
  let component;
  let props;
  const onChange = jest.fn();

  beforeEach(() => {
    props = {
      items: ['First', 'Second', 'Third'],
      defaultText: 'Test Text',
      onChange
    }
    component = shallow(<MultiCheckBox { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('', () => {

  })

  it('Default text should be displayed', () => {
    expect(component.find('.MultiCheckBox__title-text').text()).toBe('Test Text ')
  })

  it('Length of options shown correctly', () => {
    expect(component.find('.MultiCheckBox__title-length').text()).toBe('(3/3 Selected)')
  })

  it('Button initially says `Select None`', () => {
    expect(component.find('button').text()).toBe('Select None')
  })

  it('Number of checkboxes are correct for items given', () => {
    expect(component.find('.MultiCheckBox__label')).toHaveLength(3)
  })

  it('All items are initially selected with proper class name', () => {
    expect(component.find('.MultiCheckBox__checkbox--checked')).toHaveLength(3)
  })

  it('Callback function called when checkbox checked/unchecked', () => {
    component.find('.MultiCheckBox__checkbox--checked').first().simulate('change', {})
    expect(onChange).toHaveBeenCalledTimes(1);
  })

  it('Checkbox tickbox becomes unselected when unchecked', () => {
    component.find('.MultiCheckBox__checkbox--checked').first().simulate('change', {})
    expect(component.find('.MultiCheckBox__checkbox--checked')).toHaveLength(2);
  })

  it('Toggle button initially unselects all items', () => {
    component.find('button').simulate('click', {preventDefault: () => {}});
    expect(component.find('.MultiCheckBox__checkbox--checked')).toHaveLength(0);
  })

  it('When Toggle button is clicked, it changes text to `Select All`', () => {
    component.find('button').simulate('click', {preventDefault: () => {}});
    expect(component.find('button').first().text()).toBe('Select All');
  })

  it('Pressing toggle button twice reselects all items', () => {
    component.find('button').simulate('click', {preventDefault: () => {}});
    component.find('button').simulate('click', {preventDefault: () => {}});
    expect(component.find('.MultiCheckBox__checkbox--checked')).toHaveLength(3);
  })

  it('MultiCheckBox component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
