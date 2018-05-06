import React from 'react'

class MultiCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndices: props.initialSelected,
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
    if (this.props.onChange) {
      this.props.onChange(oldState.map(v => this.props.items[v]))
    }
  }

  render() {
    return (
    <React.Fragment>
      <p className='bold'>{this.props.defaultText} ({this.props.items.length})</p>
      <a href='#' onClick={this.toggleSelect}>Select {this.state.selectAll ? ' All' : ' None'}</a>
      <div className='filter__checkbox-container'>
        {this.props.items
          .map((v, i) => {
            const checked = this.state.selectedIndices.includes(i) ? 'checked' : ''
            return (
              <label key={i}>
                <input
                  type='checkbox'
                  value={v}
                  checked={checked}
                  onChange={(event) => this.updateValue(event, i)} />
                <span>{v}</span>
              </label>
            )})
        }
      </div>
    </React.Fragment>
  )}
}

export default MultiCheckBox
