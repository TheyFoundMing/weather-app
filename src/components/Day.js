import React from "react";

import "../App.scss";

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formTime: 0,
      times: this.props.data,
      currentTime: this.props.data[0],
    };
  }

  render() {
    let currentDate = new Date(this.state.currentTime.dt_txt);
    // console.log(currentDate.getDay());

    return (
      <div className="day">
        <span>
          {currentDate.getDate()}/{currentDate.getMonth()}/
          {currentDate.getFullYear()}
        </span>
        {this.state.currentTime.weather[0]["description"]}
      </div>
    );
  }
}

export default Day;
