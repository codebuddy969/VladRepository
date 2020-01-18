import React, {PureComponent} from 'react'
import styles from './styles.styl'
import { Field, reduxForm } from 'redux-form'

class Filters extends PureComponent {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          Filters:
        </div>
        <Field name='Projects' component='select' className={styles.select}>
          <option value='Projects'>Projects</option>
          <option value='Project1'>Project1</option>
          <option value='Project2'>Project2</option>
          <option value='Project2'>Project3</option>
        </Field>
        <Field name='Location' component='select' className={styles.select}>
          <option value='Location'>Location</option>
          <option value='Location1'>Location1</option>
          <option value='Location2'>Location2</option>
          <option value='Location3'>Location3</option>
        </Field>
        <Field name='SpecialOffers' component='select' className={styles.select}>
          <option value='Special offers'>Special offers</option>
          <option value='Offer1'>Offer1</option>
          <option value='Offer2'>Offer2</option>
          <option value='Offer3'>Offer3</option>
        </Field>
      </div>
    )
  }
}

export default reduxForm({
  form: 'filters'  // a unique identifier for this form
})(Filters)
