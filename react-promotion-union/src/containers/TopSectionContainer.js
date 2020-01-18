import React, { PureComponent } from 'react'
import TopSection from '../components/TopSection'
import { changeActiveLink } from '../actions'
import { connect } from 'react-redux'

class TopSectionContainer extends PureComponent {
  render () {
    return (
      <TopSection changeActiveLink={this.props.changeActiveLink} />
    )
  }
}

export default connect(
  null,
  {
    changeActiveLink
  }
)(TopSectionContainer)
