import React from 'react'
import styles from './styles.styl'
import { Field, reduxForm } from 'redux-form'

function Footer(props) {
  return (
    <div className={styles.footer}>
      <div>
        <h3 className={styles.title}>
          Receive Auction Deals!
        </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <Field name='name' component='input' type='email' placeholder='Email address' className={styles.field} />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className={styles.copy}>
        All Rights Reserved. Designated trademarks and brands are the property of their respective owners. Copyright © 2012-2017 Public Auction Finder LLC.
      </div>
    </div>
  )
}

function handleSubmit(values) {
  console.log(values)
}

export default reduxForm({
  // a unique name for the form
  form: 'newsletter'
})(Footer)
