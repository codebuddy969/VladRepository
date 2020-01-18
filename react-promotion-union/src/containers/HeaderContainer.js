import React, { PureComponent } from 'react'
import Header from '../components/Header'
import BurgerContainer from '../containers/BurgerContainer'
import { connect } from 'react-redux'

class HeaderContainer extends PureComponent {
  render () {
    if (this.props.toShowBurger) {
      return (
        <BurgerContainer>
          <Header />
        </BurgerContainer>
      )
    } else {
      return (
        <Header />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    toShowBurger: state.responsive.toShowBurger
  }
}

export default connect(
  mapStateToProps
)(HeaderContainer)
