import React from "react";

import Navbar from "react-bootstrap/Navbar";

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
      time: 3,
      days: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleScale(e) {}

  async fetchData() {
    console.log(this.state.formCity);

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
    } catch (err) {
      //   console.log(err);
    }
  }

  sortDays() {}

  render() {
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
      </div>
    );
  }
}

export default App;
