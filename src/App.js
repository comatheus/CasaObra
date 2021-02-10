import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Dash from "../src/pages/Dash";
import SignIn from "../src/pages/SignIn";

/*import logo from './logo.svg';*/

const APP_URL = "http://localhost:5000/rooms/";


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userLogged: true,
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.userLogged &&
            <Route path="/" exact component = {Dash} handler={this.handler} />
          }
          {
            <Route path="/" exact component = {SignIn} />
          }
        </div>
      </Router>

    );
  }
}
