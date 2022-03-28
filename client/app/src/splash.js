import React from 'react';

import {faqs} from './assets/data/projectData.js';
import {courses} from './assets/data/projectData.js';

import Courses from './components/courses.js';
import Newsletter from './components/newsletter.js';
import Faqs from './components/faqs.js';
import Modal from './components/modal.js';

class Homepage extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: null, 
      errorInfo: null
    }

    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }
  modalOpen() {
    this.setState({
      modal: true
    });
  }
  modalClose() {
    this.setState({
      modal: false
    });
  }
  render() {
    return (
      <div id="page" className={this.state.modal  ? 'in': ''}>
        <div id="splash">

          <section id="hero">
            <div className="image showMobile">
            </div>
            <div className="copy">
              <div className="logo"></div>
              <p>
                Book individual and group SCUBA diving lessons in Portland and Vancouver to get your PADI certification.
              </p>
              <button type="button" className="modal-btn" onClick={this.modalOpen}>
                Get Certified
              </button>
              <div className="social">
                <a className="facebook" href="https://facebook.com/thescubainstructor" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.935 63.36">
                    <path id="facebook-icon" d="M54.6,35.64l1.76-11.467h-11V16.732c0-3.137,1.537-6.195,6.465-6.195h5V.775A61,61,0,0,0,47.946,0C38.885,0,32.962,5.492,32.962,15.434v8.739H22.89V35.64H32.962V63.36h12.4V35.64Z" transform="translate(-22.89)" fill="#7c748f"/>
                  </svg>
                </a>
                <a className="instagram" href="https://instagram.com/thescubainstructor" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.766 57.753">
                    <path id="instagram-icon" d="M28.815,45.894A14.807,14.807,0,1,0,43.622,60.7,14.784,14.784,0,0,0,28.815,45.894Zm0,24.434A9.627,9.627,0,1,1,38.441,60.7a9.644,9.644,0,0,1-9.627,9.627Zm18.867-25.04a3.454,3.454,0,1,1-3.454-3.454A3.446,3.446,0,0,1,47.681,45.289Zm9.807,3.505c-.219-4.626-1.276-8.725-4.665-12.1s-7.475-4.433-12.1-4.665c-4.768-.271-19.06-.271-23.828,0-4.614.219-8.712,1.276-12.1,4.652S.36,44.155.128,48.781c-.271,4.768-.271,19.06,0,23.828.219,4.626,1.276,8.725,4.665,12.1s7.475,4.433,12.1,4.665c4.768.271,19.06.271,23.828,0,4.626-.219,8.725-1.276,12.1-4.665s4.433-7.475,4.665-12.1c.271-4.768.271-19.047,0-23.815Zm-6.16,28.932a9.746,9.746,0,0,1-5.49,5.49c-3.8,1.508-12.823,1.16-17.024,1.16s-13.235.335-17.024-1.16a9.746,9.746,0,0,1-5.49-5.49C4.793,73.924,5.141,64.9,5.141,60.7S4.806,47.467,6.3,43.678a9.746,9.746,0,0,1,5.49-5.49c3.8-1.508,12.823-1.16,17.024-1.16s13.235-.335,17.024,1.16a9.746,9.746,0,0,1,5.49,5.49c1.508,3.8,1.16,12.823,1.16,17.024S52.836,73.937,51.328,77.726Z" transform="translate(0.075 -31.825)" fill="#7c748f"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="image hideMobile">
            </div>
          </section>

          <Courses 
            data={courses}
            modalOpen={this.modalOpen}
          />

          <section id="about">
            <div className="image"></div>
            <div className="copy">
              <h3>
                <span className="orange">Meet</span>
                <span className="teal">Sabina</span>
              </h3>
              <p>
                Sixteen years ago, I took an Open Water Diver course and fell in love with SCUBA diving. It was like opening a portal to a different world, a quiet world where I was an explorer. Not only did I encounter new sea creatures, but I also discovered a new side to myself. It was exhilarating, and I just wanted to do more of it. And those feelings didn’t subside once I returned to the surface, which is when I decided that one day, I would become a SCUBA  Iinstructor. I wanted to bring that same vibrant energy to other people’s lives.
              </p>
              <p>
                In my pursuit to become a SCUBA instructor, I sold everything I owned, quit my job, and bought a one-way ticket to adventure, and have never looked back. I became a PADI SCUBA instructor in 2016. It’s the choice I could have made for my career. 
              </p>
              <button type="button" className="modal-btn" onClick={this.modalOpen}>
                Book Your Dive
              </button>
            </div>
          </section>

          <Newsletter />

          <Faqs 
            data={faqs}
            modalOpen={this.modalOpen}
          />

          <section id="dive">

            <div className="copy">
              <h3>Dive In!</h3>
              <p>
                If you’re interested in taking a course, have questions about The SCUBA Instructor’s services, or just want to chat about SCUBA, reach out.
              </p>
              <button type="button" className="modal-btn" onClick={this.modalOpen}>
                Book Your Dive
              </button>
              <div className="social">
                <a className="facebook" href="https://facebook.com/thescubainstructor" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.935 63.36">
                    <path id="facebook-icon" d="M54.6,35.64l1.76-11.467h-11V16.732c0-3.137,1.537-6.195,6.465-6.195h5V.775A61,61,0,0,0,47.946,0C38.885,0,32.962,5.492,32.962,15.434v8.739H22.89V35.64H32.962V63.36h12.4V35.64Z" transform="translate(-22.89)" fill="#C95C3F"/>
                  </svg>
                </a>
                <a className="instagram" href="https://instagram.com/thescubainstructor" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.766 57.753">
                    <path id="instagram-icon" d="M28.815,45.894A14.807,14.807,0,1,0,43.622,60.7,14.784,14.784,0,0,0,28.815,45.894Zm0,24.434A9.627,9.627,0,1,1,38.441,60.7a9.644,9.644,0,0,1-9.627,9.627Zm18.867-25.04a3.454,3.454,0,1,1-3.454-3.454A3.446,3.446,0,0,1,47.681,45.289Zm9.807,3.505c-.219-4.626-1.276-8.725-4.665-12.1s-7.475-4.433-12.1-4.665c-4.768-.271-19.06-.271-23.828,0-4.614.219-8.712,1.276-12.1,4.652S.36,44.155.128,48.781c-.271,4.768-.271,19.06,0,23.828.219,4.626,1.276,8.725,4.665,12.1s7.475,4.433,12.1,4.665c4.768.271,19.06.271,23.828,0,4.626-.219,8.725-1.276,12.1-4.665s4.433-7.475,4.665-12.1c.271-4.768.271-19.047,0-23.815Zm-6.16,28.932a9.746,9.746,0,0,1-5.49,5.49c-3.8,1.508-12.823,1.16-17.024,1.16s-13.235.335-17.024-1.16a9.746,9.746,0,0,1-5.49-5.49C4.793,73.924,5.141,64.9,5.141,60.7S4.806,47.467,6.3,43.678a9.746,9.746,0,0,1,5.49-5.49c3.8-1.508,12.823-1.16,17.024-1.16s13.235-.335,17.024,1.16a9.746,9.746,0,0,1,5.49,5.49c1.508,3.8,1.16,12.823,1.16,17.024S52.836,73.937,51.328,77.726Z" transform="translate(0.075 -31.825)" fill="#C95C3F"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="image"></div>

          </section>

        </div>

        <Modal 
          close={this.modalClose}
        />

      </div>
    );
  }
}

export default Homepage;
