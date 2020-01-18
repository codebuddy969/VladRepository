import React, {PureComponent} from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import styles from './styles.styl'
import img1 from './img/item1.png'
import img3 from './img/item3.png'
import img4 from './img/item4.png'
import arrow from './img/arrow.png'
class HowItWorks extends PureComponent {
  render () {
    return (
      <ScrollableAnchor id={'how-it-works'}>
        <section className={styles.section} id='how-it-worksSect'>
          <div className={styles.container}>
            <h3 className={styles.title}>
              How it works
            </h3>
            <div className={styles.items}>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={img1} alt='' />
                </div>
                <div className={styles.itemText}>
                  Enquire with us to discuss your junk removal
                </div>
              </div>
              <div className={styles.arrow}>
                <img src={arrow} alt='' />
              </div>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={img4} alt='' />
                </div>
                <div className={styles.itemText}>
                  Enquire with us to discuss your junk removal
                </div>
              </div>
              <div className={styles.arrow}>
                <img src={arrow} alt='' />
              </div>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={img3} alt='' />
                </div>
                <div className={styles.itemText}>
                  Enquire with us to discuss your junk removal
                </div>
              </div>
              <div className={styles.arrow}>
                <img src={arrow} alt='' />
              </div>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={img4} alt='' />
                </div>
                <div className={styles.itemText}>
                  Enquire with us to discuss your junk removal
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default HowItWorks
