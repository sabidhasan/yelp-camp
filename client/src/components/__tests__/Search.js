import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Search from '../Search'

configure({ adapter: new Adapter() });

jest.mock('../../services/fetchSearch')

describe('<Search />', () => {
  let component;
  let props;
  const context = {
    startLoad: jest.fn(),
    finishLoad: jest.fn(),
    userLocation: undefined
  }
  const onChange = jest.fn();

  beforeEach(() => {
    props = {
      location: {
        search: '?q=Test Search'
      }
    }
    component = shallow(<Search { ...props } />, {
      context
    })
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('When there are 25 search results, default page (0) shows 10', (done) => {
    expect(component.find('SearchResultTile').length).toBe(10);
    done();
  })

  it('When there are 25 search results, changing to valid page number (2) works', (done) => {
    component.instance().goToPage({preventDefault: jest.fn()}, 2)
    expect(component.state('page')).toBe(2);
    done();
  })

  it('When there are 25 search results, changing invalid page number fails', (done) => {
    component.instance().goToPage({preventDefault: jest.fn()}, 3)
    expect(component.state('page')).toBe(0);
    done();
  })

  it('Giving valid param page number shows results', (done) => {
    let props = {
      location: {
        search: '?q=Test Search&start=2'
      }
    }
    component = shallow(<Search { ...props } />, {
      context: {
        startLoad: jest.fn(),
        finishLoad: jest.fn(),
        userLocation: undefined
      }
    })
    // setTimeout is needed for async function
    setTimeout(() => {
      try {
        expect(component.state('page')).toBe(2);
        done();
      } catch (e) {
        done.fail(e)
      }
    })
  })

  it('Giving too high of a page number defaults to last page', (done) => {
    let props = {
      location: {
        search: '?q=Test Search&start=20'
      }
    }
    component = shallow(<Search { ...props } />, {
      context: {
        startLoad: jest.fn(),
        finishLoad: jest.fn(),
        userLocation: undefined
      }
    })
    setTimeout(() => {
      try {
        expect(component.state('page')).toBe(2);
        done();
      } catch (e) {
        done.fail(e)
      }
    })
  })

  it('When there are 25 search results, giving invalid param page number', (done) => {
    expect(component.find('SearchResultTile').length).toBe(10);
    done();
  })

  it('Page 2 result #1 is numbered 11', (done) => {
    component.instance().goToPage({preventDefault: jest.fn()}, 1)
    try {
      expect(component.find('SearchResultTile').first().props().number).toBe(11)
      done()
    } catch (err) {
      done.fail(err)
    }
  })

  it('Page 2 result #10 is numbered 20', (done) => {
    component.instance().goToPage({preventDefault: jest.fn()}, 1)
    try {
      expect(component.find('SearchResultTile').at(9).props().number).toBe(20)
      done()
    } catch (err) {
      done.fail(err)
    }
  })

  it('Filters are shown', () => {
    expect(component.find('FilterSearch').length).toBe(1)
  })

  it('Applying filter performs filtration', () => {
    const o = {
      selectedProv: null,
      selectedActivities: ['laundromat'],
      selectedRegions: ['Thunder Bay'],
      selectedDistances: { min: 0, max: 40 },
      sortBy: 'Distance',
    }
    component.instance().updateFilteredResults(o)
    expect(component.find('SearchResultTile').length).toBe(5);
  })

  it('MultiCheckBox component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
