import React, {PureComponent} from 'react'
import Banner from '../components/Banner'
import {connect} from 'react-redux'
import {fetchBannerFormData} from '../actions'

class BannerContainer extends PureComponent {
  componentDidMount () {
    this.props.fetchBannerFormData('http://localhost:3000/db.json')
  }
  render () {
    return (
      <Banner
        formData={this.props.formData}
      />
    )
  }
}

export default connect(
  state => {
    return {
      formData: state.formData
    }
  },
  {
    fetchBannerFormData
  }
)(BannerContainer)
