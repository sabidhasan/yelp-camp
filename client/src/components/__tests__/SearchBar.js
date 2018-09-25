import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchBar from '../SearchBar'

configure({ adapter: new Adapter() });

describe('<SearchBar />', () => {
  let component;
  let props;

  beforeEach(() => {
    const initialQuery = 'Some Search Query'
    props = { initialValue:  initialQuery }
    component = shallow(<SearchBar { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Initial search query renders in input box', () => {
    expect(component.find('.SearchBar__input').props().value).toBe('Some Search Query');
  })

  it('No results show the no-results message', () => {
    expect(component.find('.SearchBar__no-results')).toHaveLength(1);
  })

  it('Focusing on input box adds active class', () => {
    component.find('.SearchBar__input').prop('onFocus')()
    expect(component.find('.SearchBar__results--active')).toHaveLength(1);
  })

  it('Focusing on input box adds active class', () => {
    component.find('.SearchBar__input').prop('onClick')()
    expect(component.find('.SearchBar__results--active')).toHaveLength(1);
  })

  it('Clicking on input box adds active class', () => {
    component.find('.SearchBar__input').prop('onClick')()
    expect(component.find('.SearchBar__results--active')).toHaveLength(1);
  })

  const getFakeResults = () => {
    const results = [
      {id: 1, icon: 's', name: 'Some Name', text: 'Some search text'},
      {id: 1, icon: 's', name: 'Some Name', text: 'Some search text'}
    ];

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(results);
      }, 500)
    })
  }

  it('Typing in box performs search', async () => {
    const results = await getFakeResults();
    component.setState({ results });
    expect(component.find('.SearchBar__result')).toHaveLength(2);
  })

  it('SearchBar component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
