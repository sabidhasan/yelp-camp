import React from 'react'
import Select from './Select'
import MultiCheckBox from './MultiCheckBox'

class FilterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProv: null,
      selectedActivities: props.activities,
      // Select all regions
      selectedRegions: props.regions
    }
    this.handleChange = this.handleChange.bind(this)
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
      <React.Fragment>
        <div className='filter__section'>
          <h2>Area</h2>
          <Select
            items={this.props.provinces}
            defaultText={'All Provinces'}
            onChange={val => this.handleChange(val, 'selectedProv')}
          />
          <MultiCheckBox
            items={this.props.regions}
            defaultText={'Select Regions'}
            initialSelected={this.state.selectedRegions.map((v, i) => i)}
            onChange={val => this.handleChange(val, 'selectedRegions')}
          />
        </div>
        <div>
          <h2>Features</h2>
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
      </React.Fragment>
    )

  }
}

export default FilterSearch
