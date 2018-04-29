import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { provinces } from '../helpers/helpers'

class Discover extends React.Component {
 constructor(props) {
   super(props)
   if (!provinces[this.props.match.params.province]) window.location = '/';
   const province = {
     fullName: provinces[this.props.match.params.province],
     shortName: this.props.match.params.province
   }
   this.state = {province: province}
 }

 componentDidMount() {
   console.log('hel');
   const test = 'ab'
   fetch(`/campground?province=${test}`)
   .then(res => res.json())
   .then(c => console.log(c));
 }

 render() {
   return <h1>This is the single page for {this.state.province.fullName}</h1>
 }
}

export default Discover
