import React from 'react'
import ArrowLeft from 'react-icons/lib/md/arrow-back'
import ArrowRight from 'react-icons/lib/md/arrow-forward'
import styles from './styles.styl'

function Arrow (props) {
  return (
    <div>
      {props.right ? <ArrowRight onClick={props.onClick} className={styles.right} /> : <ArrowLeft onClick={props.onClick} className={styles.left} />}
    </div>
  )
}

export default Arrow
