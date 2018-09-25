import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Banner from '../Banner'

configure({ adapter: new Adapter() });

describe('<Banner />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Banner />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  const getFakeQuote = (data) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('Sample Quote');
      }, 500)
    })
  }

  it('async test', async () => {
    const quote = await getFakeQuote();
    component.setState({quote});
    expect(component.find('.Banner__quote').text()).toBe('Sample Quote');
  });

  it('Banner component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
});
