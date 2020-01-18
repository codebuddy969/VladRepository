import React, {PureComponent} from 'react'
import Nav from '../components/Nav'
import { connect } from 'react-redux'
import {changeActiveLink, toggleBurger} from '../../../actions'

class NavContainer extends PureComponent {
  onClick = index => {
    this.props.changeActiveLink(index)
  }

  render () {
    return <Nav sections={this.props.sections} handleClick={this.onClick} toggleBurger={this.props.toggleBurger} />
  }
}

export default connect(
  state => { return {'sections': state.sections} },
  {
    changeActiveLink,
    toggleBurger
  }
)(NavContainer)
