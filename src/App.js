import React from "react";

import Day from "./components/Day";

import githubImage from "./img/github.png";
import linkedinImage from "./img/linkedin.png";
import searchImage from "./img/search.png";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formCity: "",
      formScale: 0,
      fetchedData: {},

      city: "Pick a City",
      country: "",
      days: {},
      fahrenheit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.sortDays = this.sortDays.bind(this);
    this.changeTemp = this.changeTemp.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  changeTemp() {
    this.setState(function (prevState) {
      return { fahrenheit: !prevState.fahrenheit };
    });

    this.fetchData();
  }

  async fetchData() {
    try {
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${
          this.state.formCity
        }&appid=db50792fc0c680e4b599a799cb13c9fb&units=${
          this.state.fahrenheit ? "imperial" : "metric"
        }`,
        { mode: "cors" }
      );

      let dataJSON = await data.json();
      console.log(dataJSON);

      this.setState({
        city: dataJSON.city.name,
        country: dataJSON.city.country,
      });

      this.setState({ days: {} });

      this.sortDays(dataJSON.list);
    } catch (err) {
      console.log(err);
    }
  }

  sortDays(dataList) {
    let currentDate = new Date(dataList[0]["dt_txt"]).getDate();
    let days = {};

    for (let i = currentDate; i < currentDate + 5; i++) {
      days[i] = [];
    }

    for (let i = 0; i < dataList.length; i++) {
      let date = new Date(dataList[i]["dt_txt"]).getDate();

      if (date >= currentDate + 5) break;

      days[date].push(dataList[i]);
    }

    this.setState({ days });
  }

  search(event) {
    if ((event.key === "Enter") | (event.key === 13)) {
      return this.fetchData();
    }
  }

  render() {
    let days = [];

    for (let i = 0; i < Object.keys(this.state.days).length; i++) {
      days.push(
        <Day key={i} data={this.state.days[Object.keys(this.state.days)[i]]} />
      );
    }

    return (
      <div className="app">
        <div className="nav">
          <span className="brand">5 Days</span>

          <div className="search">
            <input
              type="text"
              placeholder="Search city"
              name="formCity"
              value={this.state.formCity}
              onChange={this.handleChange}
              onKeyDown={this.search}
            />

            <img
              src={searchImage}
              alt="Search"
              onClick={this.fetchData}
              className="search"
            />

            <a href="https://github.com/TheyFoundMing">
              <img src={githubImage} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/michaella-magtibay-7851421b2/">
              <img src={linkedinImage} alt="LinkedIn" />
            </a>

            <label className="switch">
              <input type="checkbox" onClick={this.changeTemp} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="city">
          <h1>
            {this.state.city}
            {this.state.country ? `, ${this.state.country}` : ""}
          </h1>
        </div>

        <div className="shelf">{days}</div>
      </div>
    );
  }
}

export default App;
