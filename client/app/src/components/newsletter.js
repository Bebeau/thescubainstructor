import React from 'react';

import bottle from '../assets/img/bottle.svg';

class Newsletter extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null, 
      errorInfo: null
    }
    this.onEmailChange = this.onEmailChange.bind(this);
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
  render() {
    const {
      email
    } = this.state;
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
              <form action="https://theinitgroup.us8.list-manage.com/subscribe/post" method="post" noValidate>
                <input type="hidden" name="u" defaultValue="90fe8a5a3c8ffa0a87fe70260"/>
                <input type="hidden" name="id" defaultValue="63e97a57b2"/>
                <input 
                  type="email" 
                  name="EMAIL" 
                  className="required email" 
                  id="mce-EMAIL"
                  placeholder="email@address.."
                  value={email} 
                  onChange={this.onEmailChange}
                />
                <div className="hiddenInput" aria-hidden="true">
                  <input type="text" name="b_90fe8a5a3c8ffa0a87fe70260_63e97a57b2" tabIndex="-1" defaultValue="" />
                </div>
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

      </section>
    );
  }
}

export default Newsletter;
