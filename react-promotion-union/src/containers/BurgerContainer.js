import React, { PureComponent } from 'react'
import Burger from '../components/Burger'
import {connect} from 'react-redux'
import {toggleBurger} from '../actions'
const listenForOverlap = require('element-overlap').listenForOverlap

class BurgerComponent extends PureComponent {
  constructor () {
    super()
    this.state = {
      color: 'white',
      isOpen: true
    }
  }

  setColor (color) {
    this.setState({color: color})
  }

  componentDidMount () {
    const options = {
      listenOn: ['scroll', 'resize'],
      timerInterval: '10',
      requiredIntersection: 'contain'
    }
    const burgerSelector = '.bm-burger-button'
    listenForOverlap(burgerSelector, '#topSectionSect', () => this.setColor('white'), options)
    listenForOverlap(burgerSelector, '#partnersSect', () => this.setColor('white'), options)
    listenForOverlap(burgerSelector, '#how-it-worksSect', () => this.setColor('black'), options)
    listenForOverlap(burgerSelector, '#bannerSect', () => this.setColor('black'), options)
    listenForOverlap(burgerSelector, '#faqSect', () => this.setColor('black'), options)
    listenForOverlap(burgerSelector, '#contactSect', () => this.setColor('white'), options)
  }
  render () {
    return (
      <Burger burgerColor={this.state.color} isOpen={this.props.isBurgerOpen} toggleBurger={this.props.toggleBurger}>
        {this.props.children}
      </Burger>
    )
  }
}

export default connect(
  state => {
    return {
      isBurgerOpen: state.isBurgerOpen
    }
  },
  {
    toggleBurger
  }
)(BurgerComponent)
