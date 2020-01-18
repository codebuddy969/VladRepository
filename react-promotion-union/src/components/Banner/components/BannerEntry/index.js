import React from 'react'
import { Field } from 'redux-form'
import styles from './styles.styl'

function BannerEntry ({id, label, size, cost, costAll, value, addPrice, substractPrice, tip}) {
  return (
    <div className={styles.container} data-tip={tip} data-html>
      <div className={styles.checkboxWrapper}>
        <Field
          id={id}
          name={id}
          component='input'
          type='checkbox'
          value={cost}
          className={styles.field}
          onChange={(e) => {
            const val = e.target.value
            if (!val) {
              addPrice(cost)
            } else {
              substractPrice(cost)
            }
          }}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
      <div className={styles.size}>
        {size}
      </div>
      <div className={styles.cost}>
        {cost}
      </div>
      <div className={styles.costAll}>
        {costAll}
      </div>
    </div>
  )
}

export default BannerEntry
