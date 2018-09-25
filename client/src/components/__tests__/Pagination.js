import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Pagination from '../Pagination'

configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let component;
  let props;
  const goToPageHandler = jest.fn();

  const propsGenerator = (currentPage, lastPage) => {
    return {
      currentPage,
      lastPage,
      goToPageHandler
    }
  }

  beforeEach(() => {
    props = {goToPageHandler}
    component = shallow(<Pagination { ...props } />)
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('When lastPage is 0, nothing gets rendered', () => {
    props = propsGenerator(5, 0);
    component = shallow(<Pagination { ...props } />)
    expect(component.html()).toBeNull();
  });

  it('When currentPage is undefined, nothing gets rendered', () => {
    props = propsGenerator(undefined, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.html()).toBeNull();
  });

  it('Pagination count is correctly displayed', () => {
    props = propsGenerator(3, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__count').text()).toBe('Page 3 of 10')
  });

  it('If currentPage is > 1, it shows previous link', () => {
    props = propsGenerator(2, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__prev-link')).toHaveLength(1)
  });

  it('If currentPage is not > 1, it does not show previous link', () => {
    props = propsGenerator(1, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__prev-link')).toHaveLength(0)
  });

  it('If currentPage matches lastPage, it doesn\'t show next link', () => {
    props = propsGenerator(10, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__next-link')).toHaveLength(0)
  });

  it('If currentPage does not match lastPage, it shows next link', () => {
    props = propsGenerator(5, 10);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__next-link')).toHaveLength(1)
  });

  it('Number of Pagination__link links is correct - 9 expected at maximum', () => {
    props = propsGenerator(2, 8);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__link')).toHaveLength(9)
  });

  it('If only one page, then no pagination shown', () => {
    props = propsGenerator(1, 1);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__link')).toHaveLength(0)
  });


  it('Function called when button clicked', () => {
    props = propsGenerator(1, 2);
    component = shallow(<Pagination { ...props } />)
    component.find('.Pagination__link').first().simulate('click');
    expect(goToPageHandler).toHaveBeenCalledTimes(1)
  })

  it('Current page link is correctly highlighted', () => {
    props = propsGenerator(5, 8);
    component = shallow(<Pagination { ...props } />)
    expect(component.find('.Pagination__link--current').text()).toBe('5')
  })

  it('Pagination component snapshot matches what is expected', () => {
    props = propsGenerator(1, 5);
    component = shallow(<Pagination { ...props } />)
    expect(toJson(component)).toMatchSnapshot();
  })
})


// currentPage matches Pagination__link--current's text()
