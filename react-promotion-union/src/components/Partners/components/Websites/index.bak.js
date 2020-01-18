import React from 'react'
import img1 from './img/site1.png'
import img2 from './img/site2.png'
import styles from './styles.styl'
import Arrow from 'react-icons/lib/md/arrow-forward'
import axios from 'axios'

function Websites (props) {
  const imgs = [
    img1,
    img2,
    img1,
    img2,
    img1,
    img2,
    img1,
    img2,
    img1,
    img2,
    img1,
    img2
  ]
  return (
    <div className={styles.container}>
      <div className={styles.webpages}>
        {imgs.map((img, index) => {
          return (
            <a href='' className={styles.image} key={'webpage-' + index}>
              <img src={img} alt='' />
            </a>
          )
        })}
        <a href='' className={styles.seeMore}>
          See more <br />
          <Arrow />
        </a>
      </div>
    </div>
  )
}

export default Websites
