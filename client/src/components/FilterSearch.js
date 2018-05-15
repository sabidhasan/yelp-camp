import React from 'react'
import Select from './Select'
import InputRange from 'react-input-range';

import MultiCheckBox from './MultiCheckBox'
import 'react-input-range/lib/css/index.css';

class FilterSearch extends React.Component {
  constructor(props) {
    super(props);
    // const filteredCampgrounds = props.filteredResults.map(v => v.distanceFromUser).filter(v => !!v);
    this.state = {
      selectedProv: null,
      selectedActivities: props.activities,
      // Select all regions
      selectedRegions: props.regions,
      selectedDistances: { min: 0, max: props.maxDistance },
      sortBy: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue, property) {
    // Apply filter
    this.setState({[property]: newValue}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state)
      }
    });
  }

  render() {
    return (
      <div className={`filter__tiles ${this.props.className}`}>
        <div className='filter__section'>
          <h2>Province and Region</h2>
          <Select
            items={this.props.provinces}
            defaultText={'All Provinces'}
            onChange={val => this.handleChange(val, 'selectedProv')}
          />
          <hr />
          <MultiCheckBox
            items={this.props.regions}
            defaultText={'Select Regions'}
            initialSelected={this.state.selectedRegions.map((v, i) => i)}
            onChange={val => this.handleChange(val, 'selectedRegions')}
          />
        </div>
        <div className='filter__section'>
          {this.props.maxDistance > 0 ?
            <React.Fragment>
              <h2>Distance and Sort</h2>
              <p>How far should the campgrounds be from you?</p>
              <InputRange
                minValue={0}
                maxValue={this.props.maxDistance}
                formatLabel={value => `${value}km`}
                value={this.state.selectedDistances}
                onChange={val => this.setState({selectedDistances: val})}
                onChangeComplete={val => this.handleChange(val, 'selectedDistances')}
                step={Math.max(Math.round(this.props.maxDistance / 100), 1)}
              />
              <hr />
            </React.Fragment>
          : null}
          <Select
            items={[{text: 'Distance', value: 'Distance'}]}
            defaultText={'Best Match'}
            onChange={val => this.handleChange(val, 'sortBy')}
          />
        </div>
        <div className='filter__section'>
          <h2>Activities</h2>
          <MultiCheckBox
            items={this.props.activities}
            defaultText={'Select Activities'}
            initialSelected={this.state.selectedActivities.map((v, i) => i)}
            onChange={val => this.handleChange(val, 'selectedActivities')}
          />

        </div>
      </div>
    )

  }
}

export default FilterSearch
