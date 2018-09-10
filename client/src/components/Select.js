import React from 'react'
import PropTypes from 'prop-types'

class Select extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      value: null
    }
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  updateValue(newValueObject) {
    if (newValueObject === null) {
      // Reset the state
      return this.setState({value: null})
    } else {
      this.setState({value: newValueObject.text})
    }
    this.props.onChange(newValueObject.value)
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const items = this.props.items || []
    return (
      <div
        tabIndex='0'
        className={`Select${this.state.expanded ? ' Select--expanded' : ''}`}
        onClick={this.toggleExpanded}>
        <span
          className={`Select__current-value bold ${this.state.expanded ? 'Select__current-value--active' : ''}`}>
          {this.state.value || this.props.defaultText}
        </span>
        <ul className={`Select__items ${this.state.expanded ? 'Select__items--expanded' : ''}`}>
          <li
            className='Select__item Select__item--first'
            onClick={() => this.updateValue(null)}
            key={-1}>
            {this.props.defaultText}
          </li>
          {items
            .map((v, i) => (
              <li
                className='Select__item Select__item--main'
                onClick={() => this.updateValue(v)}
                key={i}
                aria-setsize={items.length}
                aria-posinset={i + 1}
                >
                {v.text}
              </li>
            ))
          }
        </ul>
    </div>
  )}
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  defaultText: PropTypes.string.isRequired
}

export default Select
