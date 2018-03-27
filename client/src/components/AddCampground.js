import React from 'react'

class AddCampground extends React.Component {
  constructor(props) {
    super(props);
    this.submitNewCampground = this.submitNewCampground.bind(this)
  }

  submitNewCampground(event) {
    event.preventDefault();
    console.log('submnittng');

    //attempt fetch
    fetch('/campgrounds', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({name: this.newName.value, image: this.newImage.value})
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(data => {
        //update state
        console.log(data);
        this.props.onSuccess(data)
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <form onSubmit={this.submitNewCampground}>
        <input type="text" required ref={input => this.newName = input} />
        <input type="text" required ref={input => this.newImage = input} />
        <button>Submit</button>
      </form>
    )
  }
}

export default AddCampground
