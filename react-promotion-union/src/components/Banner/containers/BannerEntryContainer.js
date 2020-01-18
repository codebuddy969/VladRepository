import React from 'react'
import BannerEntry from '../components/BannerEntry'
import {addPrice, substractPrice} from '../../../actions'
import {connect} from 'react-redux'

function BannerEntryContainer (props) {
  return (
    <BannerEntry {...props} addPrice={props.addPrice} substractPrice={props.substractPrice} />
  )
}

export default connect(
  state => {
    return {}
  },
  {
    addPrice,
    substractPrice
  }
)(BannerEntryContainer)
