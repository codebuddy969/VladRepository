import React, { Component } from 'react'
import styles from './App.styl'

import HeaderContainer from './containers/HeaderContainer'
import TopSectionContainer from './containers/TopSectionContainer'
import Partners from './components/Partners'
import HowItWorks from './components/HowItWorks'
import BannerContainer from './containers/BannerContainer'
import Faq from './components/Faq'
import Contact from './components/Contact'

//import Perf from 'react-addons-perf'
import { configureAnchors, goToAnchor } from 'react-scrollable-anchor'
import { scrolled, updateTimeSinceScrolled, triggerIgnoreScroll, setBurgerVisibility, changeActiveLink } from './actions'
import { connect } from 'react-redux'
configureAnchors({ scrollDuration: 200 }) // scroll more quickly than the default 400ms

const listenForOverlap = require('element-overlap').listenForOverlap

class App extends Component {
    
    constructor() {
      super();
      this.state = { 
          users: [] };
    }

  componentWillMount() {
    this.props.updateTimeSinceScrolled(Date.now())
    //document.addEventListener('wheel', this.onScroll.bind(this), false)
    //document.addEventListener('keydown', this.onKeyPress.bind(this))
    goToAnchor('topSection')
    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this))
  }

  componentDidMount() {

    const bannerZone = document.getElementById('bannerZone')
    bannerZone.addEventListener('mouseover', () => this.props.triggerIgnoreScroll(true))
    bannerZone.addEventListener('mouseleave', () => this.props.triggerIgnoreScroll(false))
    const options = {
      listenOn: ['scroll', 'resize'],
      timerInterval: '10',
      requiredIntersection: 'contain'
    }
    const burgerSelector = '.topLeftCorner'

    listenForOverlap(burgerSelector, '#topSectionSect', () => this.props.changeActiveLink(0) , options)
    listenForOverlap(burgerSelector, '#partnersSect', () => this.props.changeActiveLink(1), options)
    listenForOverlap(burgerSelector, '#how-it-worksSect', () => this.props.changeActiveLink(2), options)
    listenForOverlap(burgerSelector, '#bannerSect', () =>this.props.changeActiveLink(3), options)
    listenForOverlap(burgerSelector, '#faqSect', () => this.props.changeActiveLink(4), options)
    listenForOverlap(burgerSelector, '#contactSect', () =>this.props.changeActiveLink(5), options)
  }

  onScroll = (event) => {
    
  }

  onResize() {
    if (window.innerWidth <= 1200) {
      this.props.setBurgerVisibility(true)
    } else {
      this.props.setBurgerVisibility(false)
    }
  }

  render() {
    return (
      <div className={styles.container} onWheel={this.onScroll} tabIndex="0" >
        <div className='topLeftCorner' style={{'height': '1px', width: '1px', position: 'fixed', top: '50%', left: '50%'}} />
        <HeaderContainer />
        <main className={styles.main}>
          <TopSectionContainer />
          <Partners />
          <HowItWorks />
          <BannerContainer />
          <Faq />
          <Contact />
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    scrollIgnoreStatus: state.position.scrollIgnoreStatus
  }
}

export default connect(
  mapStateToProps,
  {
    scrolled,
    updateTimeSinceScrolled,
    triggerIgnoreScroll,
    setBurgerVisibility,
    changeActiveLink
  }
)(App)
