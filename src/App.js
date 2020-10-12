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
    };
  }

  handleChange() {}
  handleScale() {}

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand>5 Days</Navbar.Brand>
          <div>
            <input type="text" placeholder="Search city" />
            <button>search</button>
            <a href="https://github.com/TheyFoundMing">Github</a>
            <a href="https://www.linkedin.com/in/michaella-magtibay-7851421b2/">
              LinkedIn
            </a>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default App;
