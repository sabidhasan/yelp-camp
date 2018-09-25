import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Activities from '../Activities'

configure({ adapter: new Adapter() });

describe('<Activities />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      activitiesList: [{logo: 's', name: 'aa'}, {logo: 's', name: 'aa'}],
    }
    component = shallow(<Activities { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });


  it('Number of activities shown equal', () => {
    expect(component.find('.Activities__activity')).toHaveLength(2)
  })

  it('If no activites, return nothing', () => {
    component.setProps({activitiesList: null});
    expect(component.html()).toBe(null);
  })

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
})
