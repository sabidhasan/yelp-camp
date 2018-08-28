import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import XButton from '../XButton.js'

configure({ adapter: new Adapter() });


describe('<XButton />', () => {
  let component;
  let props;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    props = {className: 'test-class', onClick: callback}
    component = shallow(<XButton { ...props } />)
  })

  it('Component should be defined', () => {
    expect(XButton).toBeDefined();
  });

  it('Should have a button element', () => {
    expect(component.find('button')).toHaveLength(1);
  });

  it('Should set classname based on props', () => {
    expect(component.find('button').hasClass('test-class')).toEqual(true);
  });

  it('Should call the callback function onClick', () => {
    component.find('button').simulate('click')
    expect(callback).toHaveBeenCalled();
  })
})
