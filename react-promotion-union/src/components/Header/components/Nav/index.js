import React, {PureComponent} from 'react'
import styles from './styles.styl'

class Nav extends PureComponent {
  showSections () {
    return this.props.sections.map((section, index) => {
      return (
        <li key={section.name + '-' + index}>
          <a
            href={'#' + section.href}
            className={section.active ? styles.listItemActive : ''}
            onClick={() => {
              this.props.handleClick(index)
              this.props.toggleBurger(false)
            }
            }
          >
            {section.name}
          </a>
        </li>
      )
    })
  }

  render () {
    return (
      <nav>
        <ul className={styles.list}>
          {this.showSections()}
        </ul>
      </nav>
    )
  }
}

export default Nav
