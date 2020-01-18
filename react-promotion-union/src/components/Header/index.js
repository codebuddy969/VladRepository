import React, {PureComponent} from 'react'
import styles from './styles.styl'
import logo from './logo.png'
import GoogleIcon from 'react-icons/lib/ti/social-google-plus'
import FacebookIcon from 'react-icons/lib/ti/social-facebook'
import TweeterIcon from 'react-icons/lib/ti/social-twitter'
import LinkedinIcon from 'react-icons/lib/ti/social-linkedin'
import NavContainer from './containers/NavContainer'

class Header extends PureComponent {
  render () {
    return (
      <div>
        <header className={styles.container}>
          <a href='' className={styles.logo}>
            <img src={logo} alt='Promotion Union' />
          </a>
          <NavContainer />
          <ul className={styles.social}>
            <li>
              <a href=''>
                <GoogleIcon />
              </a>
            </li>
            <li>
              <a href=''>
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href=''>
                <TweeterIcon />
              </a>
            </li>
            <li>
              <a href=''>
                <LinkedinIcon />
              </a>
            </li>
          </ul>
        </header>
      </div>
    )
  }
}

export default Header
