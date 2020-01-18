import React from 'react'
import styles from './styles.styl'
import ScrollableAnchor from 'react-scrollable-anchor'
import ArrowDown from 'react-icons/lib/md/arrow-downward'

function TopSection (props) {
  return (
    <ScrollableAnchor id={'topSection'}>
      <section className={styles.section} id='topSectionSect'>
        <h1 className={styles.title}>
          <div className={styles.titleText}>
          we're the auction site
        </div>
        </h1>
        <h2 className={styles.subtitle}>
          <div className={styles.subtitleText}>
          Advertise with us!
          </div>
        </h2>
        <div className={styles.seeMore}>
          <div className={styles.seeMoreText}>
            See our offers
          </div>
          <a
            className={styles.arrow}
            href='#partners'
            onClick={() => { props.changeActiveLink(1) }}
          >
            <ArrowDown />
          </a>
        </div>
      </section>
    </ScrollableAnchor>
  )
}

export default TopSection
