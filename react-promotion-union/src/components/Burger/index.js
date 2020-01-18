import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import styles from './styles.styl'

function Burger (props) {
  const burgerBarsColor = props.burgerColor === 'white' ? styles.burgerBarsWhite : styles.burgerBarsBlack
  return (
    <Menu
      width={'250px'}
      burgerButtonClassName={styles.burgerButton}
      burgerBarClassName={burgerBarsColor}
      crossButtonClassName={styles.burgerCrossBtn}
      crossClassName={styles.burgerCross}
      menuClassName={styles.burgerMenu}
      morphShapeClassName={styles.burgerMorph}
      itemListClassName={styles.burgerItemList}
      overlayClassName={styles.burgerOverlay}
      isOpen={props.isOpen}
      onStateChange={state => {
        if (state.isOpen) {
          props.toggleBurger(true)
        } else {
          props.toggleBurger(false)
        }
      }}
    >
      <div>
        {props.children}
      </div>
    </Menu>
  )
}

export default Burger
