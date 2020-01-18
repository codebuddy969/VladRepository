import React, { PureComponent } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import Filters from './components/Filters'
import styles from './styles.styl'
import { reduxForm } from 'redux-form'
import { Scrollbars } from 'react-custom-scrollbars'
import BannerEntryContainer from './containers/BannerEntryContainer'
import PriceTotalContainer from './containers/PriceTotalContainer'
import ReactTooltip from 'react-tooltip'
import Loader from 'halogen/PulseLoader'

class Banner extends PureComponent {
  showData (data) {
    const entries = data.map(entry => {
      return (
        <BannerEntryContainer
          key={entry.id}
          id={entry.id}
          label={entry.label}
          size={entry.size}
          cost={entry.cost}
          costAll={entry.costAll}
          value={entry.value}
          tip={`<img src='${entry.tipImg}' />`}
        />
      )
    })
    return entries
  }

  showEntries () {
    const data = this.props.formData.data
    let totalEntriesObj = []

    for (const [title, entries] of Object.entries(data)) {
      const titleObj = <div className={styles.entryTitle} key={title}>{title}</div>
      totalEntriesObj.push(titleObj)
      const entriesObj = this.showData(entries)
      totalEntriesObj = [...totalEntriesObj, ...entriesObj]
    }
    return totalEntriesObj
  }

  initTooltip () {
    return (
      <ReactTooltip
        place='bottom'
        type='light'
        className={styles.tooltip}
      />
    )
  }

  render () {
    const {fetching, fetched, errored, errorMsg} = this.props.formData
    return (
      <ScrollableAnchor id={'banner'}>
        <section className={styles.section} id='bannerSect'>
          <h3 className={styles.title}>
            Advertising Banner Sizes
        </h3>
          <div className={styles.subtitle}>
            We offer you the possibility to promote your banner on <a href=''>PublicAuctionFinder</a>,<br />
            <a href=''>AuctionMediaGroup</a>, <a href=''>RepoKar</a>, <a href=''>CarLiquidation</a>, and other 200+ partners' websites
        </div>
          <div className={styles.shadow}>
            <Filters />
            <div className={styles.containerBanner} id='bannerZone'>
              <div className={styles.labels}>
                <div className={styles.label}>
                  location
              </div>
                <div className={styles.label}>
                  size
              </div>
                <div className={styles.label}>
                  cost
              </div>
                <div className={styles.label}>
                  all websites
              </div>
              </div>
              <div className={styles.scrollWrapper}>
                <Scrollbars renderThumbVertical={props => <div {...props} className={styles.thumbVertical} />}>
                  <div className={styles.bannerForm}>

                    {fetching ? <Loader color='#d13f8c' size='14px' margin='4px' className={styles.loader} /> : null}
                    {fetched ? this.showEntries() : null}
                    {fetched ? this.initTooltip() : null}
                    {errored ? errorMsg.toString() : null}
                  </div>
                </Scrollbars>
              </div>
            </div>
          </div>
          <div className={styles.buttonZone}>
            <button className={styles.orderBtn} type='submit'>
              order now
          </button>
            {fetching ? <Loader color='#d13f8c' size='10px' margin='4px' className={styles.loader} /> : null}
            {fetched ? <PriceTotalContainer /> : null}
            <a href='' className={styles.faqLink}>
              FAQ
            </a>
            <a href='' className={styles.askLink}>
              Ask us!
            </a>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'banner'
})(Banner)
