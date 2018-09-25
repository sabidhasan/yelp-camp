import React from 'react'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Campgrounds from '../Campgrounds'

configure({ adapter: new Adapter() });

describe('<Campgrounds />', () => {
  let component;
  const newRandoms = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {name: "Pinehurst Lake Conservation", comments: [{rating: 2}]},
          {name: "Pinehurst Lake Conservation", comments: [{rating: 5}]}
        ])
      }, 500)
    })
  }

  beforeEach(() => {
    component = shallow(
        <Campgrounds />
    )
  })

  it('Expect component to be defined', () => {
    expect(component).toBeDefined();
  })

  it('Before fetching data, no campgrounds shown', () => {
    expect(component.find('.CampgroundTile')).toHaveLength(0)
  })

  it('After fetching data, the right number of campgrounds are shown', () => {
    component.setState({
        campgrounds: [
          {id: 0, name: "Pinehurst Lake Conservation", comments: [{rating: 2}]},
          {id: 1, name: "Pinehurst Lake Conservation", comments: [{rating: 2}]}
        ]
    })

    expect(component.find('.CampgroundTile')).toHaveLength(2)
  })


  it('Campgrounds component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
