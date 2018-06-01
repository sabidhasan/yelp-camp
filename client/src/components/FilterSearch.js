import React from 'react'
import Select from './Select'
import InputRange from 'react-input-range';
import MultiCheckBox from './MultiCheckBox'
import 'react-input-range/lib/css/index.css';

class FilterSearch extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      selectedProv: null,
      selectedActivities: props.filterCriteria.activities,
      selectedRegions: props.filterCriteria.regions,
      selectedDistances: {min: 0, max: props.filterCriteria.maxDistance},
      sortBy: null,
      filterAreaExpanded: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState({filterAreaExpanded: !this.state.filterAreaExpanded})
  }

  handleChange(newValue, property) {
    // Apply filter
    this.setState({[property]: newValue}, () => {
      if (this.props.onChange) this.props.onChange(this.state)
    });
  }

  render() {
    return (
      <div className={`FilterSearch ${this.props.className}`}>
        {/* <h2>Filters</h2> */}
        <button
          className='FilterSearch__button btn bold btn--flat'
          onClick={this.toggleExpanded}>
          <i class="fas fa-sliders-h"></i>
          {this.state.filterAreaExpanded ? 'Hide ' : 'Show '} Filters
        </button>
        <div className={`FilterSearch__tiles ${this.state.filterAreaExpanded ? 'FilterSearch__tiles--expanded' : ''}`}>
          <div className='FilterSearch__section'>
            <h2>Region</h2>
            {this.props.filterCriteria.regions.length ?
              <MultiCheckBox
                items={this.props.filterCriteria.regions}
                defaultText={'Select Regions'}
                onChange={val => this.handleChange(val, 'selectedRegions')}
              />
            : null }
          </div>
          <div className='FilterSearch__section FilterSearch__distance'>
            {this.props.filterCriteria.maxDistance > 0 ?
              <React.Fragment>
                <h2>Distance</h2>
                <InputRange
                  minValue={0}
                  maxValue={this.props.filterCriteria.maxDistance}
                  formatLabel={value => `${value}km`}
                  value={this.state.selectedDistances}
                  onChange={val => {
                    console.log(val);
                    this.setState({selectedDistances: val})

                  }}
                  onChangeComplete={val => this.handleChange(val, 'selectedDistances')}
                />
              </React.Fragment>
            : null}
            <h2>Province</h2>
            <Select
              items={this.props.filterCriteria.provinces}
              defaultText={'All Provinces'}
              onChange={val => this.handleChange(val, 'selectedProv')}
            />

            <h2>Sort</h2>
            <Select
              items={[{text: 'Distance', value: 'Distance'}]}
              defaultText={'Best Match'}
              onChange={val => this.handleChange(val, 'sortBy')}
            />

          </div>
          <div className='FilterSearch__section'>
            <h2>Activities</h2>
            {this.props.filterCriteria.activities.length ?
              <MultiCheckBox
                items={this.props.filterCriteria.activities}
                defaultText={'Select Activities'}
                onChange={val => this.handleChange(val, 'selectedActivities')}
              />
            : null }
          </div>
        </div>
      </div>
    )
  }
}

export default FilterSearch
