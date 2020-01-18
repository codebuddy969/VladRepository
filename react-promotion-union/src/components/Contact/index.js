import React, {PureComponent} from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import styles from './styles.styl'
import Location from './components/Location'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

class Contact extends PureComponent {
  render () {
    return (
      <ScrollableAnchor id={'contact'}>
        <section className={styles.section} id='contactSect'>
          <div className={styles.mainPart}>
            <div className={styles.contactPart}>
              <h3 className={styles.contactTitle}>
                contact us
              </h3>
              <ContactForm />
            </div>
            <div className={styles.locationPart}>
              <h3 className={styles.locationTitle}>
                location
              </h3>
              <Location />
            </div>
          </div>
          <Footer />
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Contact
