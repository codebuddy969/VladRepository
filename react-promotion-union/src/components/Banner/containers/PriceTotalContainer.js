import React from 'react'
import {connect} from 'react-redux'
import PriceTotal from '../components/PriceTotal'

function PriceTotalContainer ({values, totalPrice}) {
  return (
    <PriceTotal values={false && values} totalPrice={totalPrice} />
  )
}

export default connect(
  state => {
    return {
      values: state.form.banner.values,
      totalPrice: state.totalPrice
    }
  }
)(PriceTotalContainer)
