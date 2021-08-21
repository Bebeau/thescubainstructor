import React from 'react';

class Modal extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      course: ''
    }
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCourseChange = this.onCourseChange.bind(this);
    this.hasValue = this.hasValue.bind(this);
  }
  onFirstNameChange(event) {
    this.hasValue(event.target);
    this.setState({
      firstName: event.target.value
    });
  }
  onLastNameChange(event) {
    this.hasValue(event.target);
    this.setState({
      lastName: event.target.value
    });
  }
  onEmailChange(event) {
    this.hasValue(event.target);
    this.setState({
      email: event.target.value
    });
  }
  onPhoneChange(event) {
    this.hasValue(event.target);
    this.setState({
      phone: event.target.value
    });
  }
  onDateChange(event) {
    this.hasValue(event.target);
    this.setState({
      date: event.target.value
    });
  }
  onCourseChange(event) {
    this.hasValue(event.target);
    this.setState({
      course: event.target.value
    });
  }
  hasValue(el) {
    if(el.value) {
      el.classList.add("filled");
    } else {
      el.classList.remove("filled");
    }
  }
  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      course
    } = this.state;
    return (
      <section id="modal">
        <div className="imagePlaceholder"></div>
        <div className="formWrap">
          <button className="close" onClick={this.props.close}></button>
          <form action="" method="post">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={firstName}
              onChange={this.onFirstNameChange}
              autoComplete="off"
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name"
              value={lastName}
              onChange={this.onLastNameChange}
              autoComplete="off"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              value={email}
              onChange={this.onEmailChange}
              autoComplete="off"
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone"
              value={phone}
              onChange={this.onPhoneChange}
              autoComplete="off"
            />
            <input 
              type="text" 
              name="date" 
              placeholder="Desired Date"
              value={date}
              onChange={this.onDateChange}
              autoComplete="off"
            />
            <input 
              type="text" 
              name="package" 
              placeholder="Dive Package"
              value={course}
              onChange={this.onCourseChange}
              autoComplete="off"
            />
            <button type="submit" className="">
              Send
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Modal;
