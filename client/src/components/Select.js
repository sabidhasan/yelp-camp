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
    const ulMaxHeight = this.state.expanded ? 'dropdown-expanded' : undefined;
    return (
      <div
        className='filter__dropdown-container'
        onClick={this.toggleExpanded}>
        <span>
          {this.state.value || this.props.defaultText}
        </span>
        <ul className={ulMaxHeight}>
          <li
            onClick={()=> this.updateValue(null)}
            key={-1}>
            {this.props.defaultText}
          </li>
          {this.props.items
            .map((v, i) => (
              <li
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
