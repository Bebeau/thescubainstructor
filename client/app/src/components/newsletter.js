import React from 'react';

import bottle from '../assets/img/bottle.svg';

class Newsletter extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null, 
      errorInfo: null,
      emailMessage: ""
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNesletterSubmit = this.onNesletterSubmit.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }
  onNesletterSubmit(event) {
    event.preventDefault();
    let formData = {
      email: this.state.email,
      status: 'subscribed'
    }
    fetch('/newsletter', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => {  
      return res.json() 
    })
    .then((res) => {
      if(!Object.keys(res).length) {
        this.setState({
          email: '',
          emailMessageTitle: 'Thank you for joining!',
          emailMessageDetails: 'You have been successfully subscribed to The Scuba Instructor\'s newsletter.'
        });
      }
      if(res.statusCode === 400) {
        this.setState({
          emailMessageTitle: res.title,
          emailMessageDetails: res.detail
        });
      }
    })
    .catch(function(err) {
       console.log(err);
    });
  }
  render() {
    return (
      <section id="newsletter">

        <div className="copy">
          <img src={bottle} alt="bottle" />
          <div>
            <h3>
              <span className="grey">Our</span>
              <span className="blue">Scuba</span>
              <span className="teal">Community</span>
            </h3>
            <p>
              To follow The SCUBA Instructor’s adventures in the Pacific Northwest or the Bay Islands or to learn more about getting certified, join our SCUBA community.
            </p>
            <div id="email">
              <form onSubmit={this.onNesletterSubmit}>
              <input 
                  type="email" 
                  name="email" 
                  className="required email"
                  placeholder="email@address.."
                  value={this.state.email} 
                  onChange={this.onEmailChange}
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
            </div>
            <div className="newsletterMessage">
              <h5>{this.state.emailMessageTitle}</h5>
              <p>{this.state.emailMessageDetails}</p>
            </div>
          </div>

        </div>

      </section>
    );
  }
}

export default Newsletter;
