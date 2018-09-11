import React from 'react'
import PropTypes from 'prop-types'

class MultiCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Select all items by default
      selectedIndices: props.items.map((v, i) => i),
      // this variable determines wherther to do "selectAll" or selectNone
      selectAll: false
    }

    this.updateValue = this.updateValue.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  toggleSelect(e) {
    e.preventDefault();
    // if true, make false
    var newIndices = [];
    if (this.state.selectAll === true) {
      //Make new indices full
      for (let i = 0; i < this.props.items.length; i++) {
        newIndices.push(i)
      }
    }
    this.setState({
      selectAll: !this.state.selectAll,
      selectedIndices: newIndices
    });
    // Fire event listener
    if (this.props.onChange) {
      this.props.onChange(newIndices.map(v => this.props.items[v]))
    }
  }

  updateValue(event, newValue) {
    // Copy old state
    const oldState = this.state.selectedIndices.slice();
    const oldId = oldState.findIndex(val => val === newValue);
    if (oldId === -1) {
      // Add to state
      oldState.push(newValue)
    } else {
      // Remove from state
      oldState.splice(oldId, 1)
    }
    this.setState({selectedIndices: oldState});
    // Fire event listener
    this.props.onChange(oldState.map(v => this.props.items[v]))
  }

  render() {
    return (
    <React.Fragment>
      <p className='bold'>
        <span className='MultiCheckBox__title-text'>{this.props.defaultText} </span>
        <span className='MultiCheckBox__title-length'>
          ({this.state.selectedIndices.length}/{this.props.items.length} Selected)
        </span>
      </p>
      <button onClick={this.toggleSelect} className='btn btn--flat'>
        {`Select ${this.state.selectAll ? 'All' : 'None'}`}
      </button>
      <div className='MultiCheckBox__container'>
        {this.props.items
          .map((v, i) => {
            const checked = this.state.selectedIndices.includes(i) ? 'checked' : ''
            return (
              <label
                className='MultiCheckBox__label'
                key={i}
              >
                <input
                  className={`MultiCheckBox__checkbox ${checked ? 'MultiCheckBox__checkbox--checked' : ''}`}
                  type='checkbox'
                  value={v}
                  aria-describedby="MultiCheckBox__text"
                  aria-checked={checked}
                  checked={checked}
                  onChange={(event) => this.updateValue(event, i)} />
                <span className='MultiCheckBox__text' id='MultiCheckBox__text'>{v}</span>
              </label>
            )})
        }
      </div>
    </React.Fragment>
  )}
}

MultiCheckBox.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string
}

MultiCheckBox.defaultProps = {
  defaultText: ''
}

export default MultiCheckBox
