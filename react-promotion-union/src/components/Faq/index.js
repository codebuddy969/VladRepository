import React, { Component } from 'react';
import axios from 'axios'
import ScrollableAnchor from 'react-scrollable-anchor'
import styles from './styles.styl'
import Answer from './components/Answer'
import {triggerFaq} from '../../actions'
import {connect} from 'react-redux'

class Faq extends Component {
    
    state = {
        data: []
    }

    componentDidMount() {
        axios.get( 'http://bannersystem.md/api/faq' ).then(result => {
            const data = result.data.data;
            this.setState({data});
        });
    }

    render () {
        
  return (
    <ScrollableAnchor id={'faq'}>
      <section className={styles.section} id='faqSect'>
        <div className={styles.container}>
          <h3 className={styles.title}>
            f.a.q
          </h3>
          <div className={styles.answers}>
            {mapAnswersToText(this.state.data, this.props.triggerFaq, this.props.faq.itemActive)}
          </div>
        </div>
      </section>
    </ScrollableAnchor>
  )
    }
}

function mapAnswersToText (data, triggerFaq, itemActive) {
  return (
    data.map((el, id) => {
      return (
        <Answer
          id={id}
          title={el.faq_question}
          text={el.faq_answer}
          key={'answer-' + id}
          triggerFaq={triggerFaq}
          active={id === itemActive ? true : false}
        />
      )
    })
  )
}

const mapStateToProps = state => {
  return {
    faq: state.faq
  }
}

const mapDispatchToProps = dispatch => {
  return {
    triggerFaq: id => {
      dispatch(triggerFaq(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Faq)