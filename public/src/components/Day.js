import React from "react";

import "../App.scss";

import thunder from "../img/storm.png";
import rainy from "../img/rainy.png";
import drizzle from "../img/drizzle.png";
import snow from "../img/storm.png";
import atmosphere from "../img/haze.png";
import clear from "../img/sun.png";
import clouds from "../img/cloudy.png";

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formTime: 0,
      times: this.props.data,
      currentTime: this.props.data[0],
    };
  }

  pickImage(weatherID) {
    switch (true) {
      case weatherID >= 801:
        return clouds;

      case weatherID === 800:
        return clear;

      case weatherID >= 700:
        return atmosphere;

      case weatherID >= 600:
        return snow;

      case weatherID >= 500:
        return rainy;

      case weatherID >= 300:
        return drizzle;

      default:
        return thunder;
    }
  }

  render() {
    let currentDate = new Date(this.state.currentTime.dt_txt);
    let weatherID = this.state.currentTime.weather[0]["id"];
    let weatherImg = this.pickImage(weatherID);

    let weekDays = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    return (
      <div className="day">
        <div className="status">
          <h1>
            {this.props.firstDay ? "Today" : weekDays[currentDate.getDay()]}
          </h1>
          {this.state.currentTime.weather[0]["description"]}
        </div>

        <img src={weatherImg} alt="" />

        <div className="details">
          <span className="temp">
            {Math.round(this.state.currentTime.main["temp"])}&#176;C
          </span>
          <div className="minmax">
            <span>
              {Math.round(this.state.currentTime.main["temp_max"])}&#176;
            </span>
            <span>
              {Math.round(this.state.currentTime.main["temp_min"])}&#176;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Day;
