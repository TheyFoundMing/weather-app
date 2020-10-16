import React from "react";

import Navbar from "react-bootstrap/Navbar";

import "./App.scss";

import Day from "./components/Day";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formCity: "",
      formScale: 0,
      fetchedData: {},

      city: "Pick a City",
      country: "",
      time: 3,
      data: {},
      days: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.sortDays = this.sortDays.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async fetchData() {
    try {
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.formCity}&appid=db50792fc0c680e4b599a799cb13c9fb`,
        { mode: "cors" }
      );

      let dataJSON = await data.json();
      console.log(dataJSON);

      this.setState({
        city: dataJSON.city.name,
        country: dataJSON.city.country,
      });

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

  render() {
    let days = [];
    let c = 0;

    for (const day in this.state.days) {
      days.push(<Day key={c++} data={day} />);
    }

    return (
      <div>
        <Navbar>
          <Navbar.Brand>5 Days</Navbar.Brand>
          <div>
            <input
              type="text"
              placeholder="Search city"
              name="formCity"
              value={this.state.formCity}
              onChange={this.handleChange}
            />
            <button onClick={this.fetchData}>search</button>
            <a href="https://github.com/TheyFoundMing">Github</a>
            <a href="https://www.linkedin.com/in/michaella-magtibay-7851421b2/">
              LinkedIn
            </a>
          </div>
        </Navbar>

        <h1>
          {this.state.city}
          {this.state.country ? `, ${this.state.country}` : ""}
        </h1>

        <h1>{this.state.time}</h1>

        <input
          type="range"
          name="time"
          min="3"
          max="24"
          step="3"
          value={this.state.time}
          onChange={this.handleChange}
        />

        <div className="shelf">{days}</div>
      </div>
    );
  }
}

export default App;
