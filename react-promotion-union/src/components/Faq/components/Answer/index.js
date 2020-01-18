import React from 'react'
import styles from './styles.styl'
import Arrow from 'react-icons/lib/md/chevron-right'
import borderDistance from 'react-border-distance'

function Answer (props) {
  const {distance} = props
  const answerDrop = distance && distance.bottom < 350
  ? styles.answerDropup
  : styles.answerDropDown
  let blockText = null
  if (props.active) {
    blockText = <div className={styles.answerText + ' ' + answerDrop}>
      {props.text}
    </div>
  }
  return (
    <div >
      <div className={styles.questionBlock} onClick={() => props.triggerFaq(props.id)}>
        <div className={styles.questionText}>
          {props.title}
        </div>
        <div className={props.active ? styles.questionArrow + ' ' + styles.questionArrowActive : styles.questionArrow}>
          <Arrow />
        </div>
      </div>
      {blockText}
    </div>
  )
}

export default borderDistance({}, styles.answer)(Answer)
