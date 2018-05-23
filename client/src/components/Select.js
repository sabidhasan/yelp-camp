import React from 'react'

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
      this.setState({value: null})
    } else {
      this.setState({value: newValueObject.text})
    }
    if (this.props.onChange) {
      this.props.onChange(newValueObject ? newValueObject.value : null)
    }
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    return (
      <div
        className={`Select${this.state.expanded ? ' Select--expanded' : ''}`}
        onClick={this.toggleExpanded}>
        <span
          className={`Select__current-value bold ${this.state.expanded ? 'Select__current-value--active' : ''}`}>
          {this.state.value || this.props.defaultText}
        </span>
        <ul className={`Select__items ${this.state.expanded ? 'Select__items--expanded' : ''}`}>
          <li
            className='Select__item'
            onClick={()=> this.updateValue(null)}
            key={-1}>
            {this.props.defaultText}
          </li>
          {this.props.items
            .map((v, i) => (
              <li
                className='Select__item'
                onClick={() => this.updateValue(v)}
                key={i}>
                {v.text}
              </li>
            ))
          }
        </ul>
    </div>
  )}
}

export default Select
