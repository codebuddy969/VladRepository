import React from 'react'
import styles from './styles.styl'

function PriceTotal ({values = {}, totalPrice}) {
  return (
    <div className={styles.box}>
      Selected
      <span>{' ' + Object.keys(values).length} banners (
        <span className={styles.price}>${totalPrice}</span>)
      </span>
    </div>
  )
}

export default PriceTotal
