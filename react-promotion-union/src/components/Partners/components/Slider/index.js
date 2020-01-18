import React, { Component } from 'react'
import Slick from 'react-slick'
import Arrow from './components/Arrow'
import styles from './styles.styl'
import slideImg from './img/slide1.png'
import axios from 'axios'

class Slider extends Component {
    

    state = {
        data: [],
        datamap: [1]
    }

    componentDidMount() {
        axios.get( 'http://bannersystem.md/api/projects/get_projects' ).then(result => {
            const datamain = result.data.data.main;
            const datamap = datamain.map(function(res) {
                return res.logo
            });
            this.setState({datamap});
        });
    }
    
  slides () {
      
    const dat = this.state.datamap;
    return dat.map((img, index) => {
      return (
        <div key={'slide-' + index} className={styles.slide}>
          <img src={img} alt='' />
        </div>
      )
    })
  }
  render () {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      nextArrow: <Arrow right />,
      prevArrow: <Arrow />,
      className: styles.container,
      responsive: [
        {
          breakpoint: 1850,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <Slick {...settings}>
        {this.slides()}
      </Slick>
    )
  }
}

export default Slider
