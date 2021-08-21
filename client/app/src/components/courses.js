import React from 'react';

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCourse: this.props.data[0]["title"],
      videoUrl: this.props.data[0]["video"]
    }
    this.courseClick = this.courseClick.bind(this);
  }
  courseClick(event) {
    let index = event.target.getAttribute("data-key"),
        video = document.getElementsByTagName('video')[0];
    this.setState({
      activeCourse: this.props.data[index]["title"],
      videoUrl: this.props.data[index]["video"]
    });
    video.load();
  }
  render() {
    const {
      activeCourse,
      videoUrl
    } = this.state;
    return (
      <section id="courses">
        <div className="copy">
          <h3>
            <span className="blue">Courses And Packages</span>
          </h3>
          <p>
            Whether you’re new to diving or already certified and want to continue your SCUBA diving education, The SCUBA Instructor offers several courses and packages:
          </p>
          <div className="courseWrap">
            <ul className="courseList">
              {this.props.data !== false ? this.props.data.map((course, index) =>
                <li 
                  key={index} 
                  onClick={this.courseClick} 
                  className={(activeCourse === course.title) ? 'active' : null}
                  data-key={index}>
                  {course.title}
                </li>
              ): null}
            </ul>
            <div className="videoWrap">
              <div className="videoRatio">
                <video controls preload="auto" autoPlay defaultMuted>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <button type="button" className="modal-btn" onClick={this.props.modalOpen}>
            Book A Course
          </button>
        </div>
      </section>
    );
  }
}

export default Courses;
