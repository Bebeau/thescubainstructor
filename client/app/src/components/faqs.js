import React from 'react';

class Faqs extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.faqClick = this.faqClick.bind(this);
  }
  faqClick(event) {
    let question = event.target.closest("li"),
        prev = document.querySelector(".faq.open");

    if(prev) {
      prev.classList.remove('open');
    }

    if(question.classList.contains('open')) {
      question.classList.remove('open');
    } else {
      question.classList.add('open');
    }
  }
  render() {
    return (
      <div id="faqs">
        <div className="copy">
          <h3>
            FAQ's
          </h3>
          <ul className="faqList">
            {this.props.data !== false ? this.props.data.map((faq, index) =>
              <li key={index} onClick={this.faqClick} className="faq">
                <div className="question">
                  {faq.question}
                </div>
                <div className="answer">
                  {faq.answer}
                  {faq.bullets ? ( 
                    <ul>
                      {faq.bullets.map((data, index) => {
                        return (
                          <li key={index}>{data}</li>
                        );
                      })}
                    </ul> 
                  ): null }
                </div>
              </li>
            ): null}
          </ul>
          <button type="button" className="modal-btn" onClick={this.props.modalOpen}>
            Get Certified
          </button>
        </div>
      </div>
    );
  }
}

export default Faqs;
