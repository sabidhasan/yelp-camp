import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WeatherBox from '../WeatherBox'

configure({ adapter: new Adapter() });

describe('<WeatherBox />', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      weather: {
        icon: '',
        summary: 'Sample Summary',
        temperature: 50,
        humidity: 50,
        windSpeed: 5
      }
    }
    component = shallow(<WeatherBox { ...props } />)
  });

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('If no weather data, then render no data', () => {
    props = {
      weather: undefined
    }
    component = shallow(<WeatherBox { ...props } />)
    expect(component.find('.WeatherBox__error').text()).toBe('No weather available')
  });

  it('LoginForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });  
});
