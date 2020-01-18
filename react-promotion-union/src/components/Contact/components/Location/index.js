import React from 'react'
import styles from './styles.styl'

const Location = (props) => {
  return (
    <ul className={styles.list}>
      <li>
        <div className={styles.title}>
          adress
        </div>
        <div className={styles.item}>
          129/3 Baten kha mor, Chapai Nawabgonj, Bangladesh
        </div>
      </li>
      <li>
        <div className={styles.title}>
          email
        </div>
        <div className={styles.item}>
          <a href='mailto:example@example.com'>example@example.com</a> <br />
          <a href='mailto:example@example.com'>example@example1.com</a>
        </div>
      </li>
      <li>
        <div className={styles.title}>
          phone
        </div>
        <div className={styles.item}>
          (800) 946-5435 <br />
          (800) 946-5435
        </div>
      </li>
    </ul>
  )
}

export default Location
