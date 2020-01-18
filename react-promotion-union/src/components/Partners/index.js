import React, {PureComponent} from 'react'
import styles from './styles.styl'
import ScrollableAnchor from 'react-scrollable-anchor'
import Slider from './components/Slider'
import Websites from './components/Websites'

class Partners extends PureComponent {
  render () {
    return (
      <ScrollableAnchor id={'partners'}>
        <section className={styles.section} id='partnersSect'>
          <h3 className={styles.title}>
            Promote your banner on
          </h3>
          <div className={styles.subtitle}>
            PublicAuctionFinder, AuctionMediaGroup, RepoKar, CarLiquidation
          </div>
          <Slider />
          <div className={styles.websitesTitle}>
            and other 200 + partners' websites
          </div>
          <Websites />
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Partners
