import React from 'react';

import {
  parseIncompletePhoneNumber,
  Metadata,
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'libphonenumber-js'

class Modal extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      date: '',
      course: '',
      responseSuccess: false,
      responseTitle: '',
      responseDetails: ''
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onInquirySubmit = this.onInquirySubmit.bind(this);
    this.clearResponse = this.clearResponse.bind(this);
    this.checkRequiredFields = this.checkRequiredFields.bind(this);
  }
  onFieldChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value 
    });
    this.fieldHasValue(event.target);
  }
  onPhoneChange(event) {
    let code = 'US',
      number = parseIncompletePhoneNumber(event.target.value, code),
      limit = new Metadata().metadata.countries[code][3].slice(-1)[0];

      if(number.length > limit) {
        number = number.substring(0,limit);
      }

      let isPossible = isPossiblePhoneNumber(number, code);
      if(isPossible) {
        number = parsePhoneNumber(number, code).format("NATIONAL");
        this.fieldHasValue(event.target);
      }

    this.setState({
      phoneNumber: number,
      isPossibleNumber: isPossible
    });
  }
  fieldHasValue(el) {
    if(el.value) {
      el.classList.add("filled");
    } else {
      el.classList.remove("filled");
    }
  }
  checkRequiredFields() {
    if(!this.state.firstName) {
      this.setState({
        formMessage: "Enter first name."
      });
      return false;
    }
    if(!this.state.lastName) {
      this.setState({
        formMessage: "Enter last name."
      });
      return false;
    }
    if(!this.state.email) {
      this.setState({
        formMessage: "Enter a valid email address."
      });
      return false;
    }
    if(!this.state.phoneNumber) {
      this.setState({
        formMessage: "Enter a valid phone number."
      });
      return false;
    }
    if(!this.state.date) {
      this.setState({
        formMessage: "Enter desired dive dates."
      });
      return false;
    }
    if(!this.state.course) {
      this.setState({
        formMessage: "Enter desired dive course."
      });
      return false;
    }
    return true;
  }
  onInquirySubmit(event) {
    event.preventDefault();
    const errorCheck = this.checkRequiredFields();
    if(!errorCheck) {
      return;
    }
    let formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phoneNumber,
      date: this.state.date,
      course: this.state.course,
      status: 'subscribed'
    }
    fetch('/submitRequest', {
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
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        date: '',
        course: '',
        responseSuccess: true,
        responseTitle: res.title,
        responseDetails: res.detail
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  clearResponse() {
    this.setState({
      responseSuccess: false,
      responseTitle: "",
      responseDetails: ""
    });
  }
  render() {
    return (
      <section id="modal">
        <div className="imagePlaceholder"></div>
        <div className="formWrap">
          <button className="close" onClick={this.props.close}></button>
          {this.state.responseSuccess ? (
              <div className="responseMessage">
                <h4>{this.state.responseTitle}</h4>
                <p>{this.state.responseDetails}</p>
                <button onClick={this.clearResponse}>Close</button>
              </div>
            ):(
            <form onSubmit={this.onInquirySubmit}>
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                value={this.state.firstName}
                onChange={this.onFieldChange}
                autoComplete="off"
                className="field"
              />
              <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onFieldChange}
                autoComplete="off"
                className="field"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email"
                value={this.state.email}
                onChange={this.onFieldChange}
                autoComplete="off"
                className="field"
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone"
                value={this.state.phoneNumber}
                onChange={this.onPhoneChange}
                autoComplete="off"
                className="field"
              />
              <input 
                type="text" 
                name="date" 
                placeholder="Desired Date"
                value={this.state.date}
                onChange={this.onFieldChange}
                autoComplete="off"
                className="field"
              />
              <input 
                type="text" 
                name="course" 
                placeholder="Dive Course"
                value={this.state.course}
                onChange={this.onFieldChange}
                autoComplete="off"
                className="field"
              />
              <button type="submit">
                Send
              </button>
              {this.state.formMessage ? (
                <div className="errorMessage">
                  <p>{this.state.formMessage}</p>
                </div>
              ) : null}
            </form>
          )}
        </div>
      </section>
    );
  }
}

export default Modal;
