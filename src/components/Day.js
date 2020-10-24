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

  render() {
    let currentDate = new Date(this.state.currentTime.dt_txt);
    let weatherID = this.state.currentTime.weather[0]["id"];
    let weatherImg;
    // console.log(currentDate.getDay());

    switch (true) {
      case weatherID >= 801:
        weatherImg = clouds;
        break;

      case weatherID === 800:
        weatherImg = clear;
        break;

      case weatherID >= 700:
        weatherImg = atmosphere;
        break;

      case weatherID >= 600:
        weatherImg = snow;
        break;

      case weatherID >= 500:
        weatherImg = rainy;
        break;

      case weatherID >= 300:
        weatherImg = drizzle;
        break;

      default:
        weatherImg = thunder;
        break;
    }

    return (
      <div className="day">
        <div className="status">
          <span>
            {currentDate.getDate()}/{currentDate.getMonth()}/
            {currentDate.getFullYear()}
          </span>
          {this.state.currentTime.weather[0]["description"]}
        </div>

        <img src={weatherImg} alt="" />

        <div className="details">
          <span>Temperature: {this.state.currentTime.main["temp"]}</span>
          <span>Feels like: {this.state.currentTime.main["feels_like"]}</span>
          <span>Max: {this.state.currentTime.main["temp_max"]}</span>
          <span>Min: {this.state.currentTime.main["temp_min"]}</span>
          <span>Humidity: {this.state.currentTime.main["humidity"]}</span>
        </div>
      </div>
    );
  }
}

export default Day;
