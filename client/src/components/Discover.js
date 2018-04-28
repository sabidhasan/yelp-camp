import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { provinces } from '../helpers/helpers'

class Discover extends React.Component {
 constructor(props) {
   super(props)
   if (!provinces[this.props.match.params.province]) window.location = '/';
   this.province = {
     fullName: provinces[this.props.match.params.province],
     shortName: this.props.match.params.province
  }
 }
 render() {
   return <h1>This is the single page for {this.province.fullName}</h1>
 }
}

export default Discover
