import React, {PureComponent} from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './styles.styl'
import axios from 'axios'

class ContactForm extends PureComponent {
    
    state = {
        name: 'Caligula',
        email: 'Caligula@caligula.com',
        subject: 'From heart to heart subject',
        website: 'mr.unknown.com',
        message: 'We are here, and that`s fantastic.'
    }

    postDataHandler = (event) => {
        event.preventDefault();        
        const data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            website: this.state.website,
            message: this.state.message
        }
        
        axios.post ('http://bannersystem.md/api/faq', data,{ headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).then(response => {
            console.log(response); 
        });
    }
    
    componentDidMount() {
        this.props.initialize({ 
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            website: this.state.website,
            message: this.state.message
        });
    }
    
  render () {
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <Field name='name' component='input' type='text' placeholder='Your name*' className={styles.field} />
        </div>
        <div>
          <Field name='email' component='input' type='email' placeholder='Email address*' className={styles.field} />
        </div>
        <div>
          <Field name='subject' component='input' type='text' placeholder='Your subject*' className={styles.field} />
        </div>
        <div>
          <Field name='website' component='input' type='text' placeholder='Website' className={styles.field} />
        </div>
        <div className={styles.textAreaBlock}>
          <Field name='message' component='textarea' type='text' placeholder='Write message*' className={styles.field + ' ' + styles.textArea} />
        </div>
        <button onClick={this.postDataHandler} type='submit'>Send message</button>
      </form>
    )
  }
}

function handleSubmit (values) {
  console.log(values)
}

export default reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)
