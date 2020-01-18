import React, {Component} from 'react'
import styles from './styles.styl'
import Arrow from 'react-icons/lib/md/arrow-forward'
import axios from 'axios'

class Websites extends Component {
    
    state = {
        data: [],
        datamap: [1]
    }

    componentDidMount() {
        axios.get( 'http://bannersystem.md/api/projects/get_projects' ).then(result => {
            const data = result.data.data.other;
            const datamap = data.map(function(res, i) {
                return {
                    logo: res.logo,
                    link: res.link
                }
            });
            this.setState({datamap});
        });
    }
    
    render () {
        
      const dataimg = this.state.datamap;
        console.log(dataimg)

      return (
        <div className={styles.container}>
          <div className={styles.webpages}>
            {dataimg.map((item, index) => {
              return (
                <a href={item.link} className={styles.seeMore} key={'webpage-' + index}>
                  <img src={item.logo} alt='' />
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
}

export default Websites
