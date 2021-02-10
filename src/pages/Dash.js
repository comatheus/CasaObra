import React, { Component, Profiler } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Picture from "../components/Picture";
import MainMenu from "../components/Menu";
import Canvas from "../components/Canvas";

/*import logo from './logo.svg';*/

const APP_URL = "http://localhost:5000/rooms/";

/*function onSelect(menu)) {
  setState({ menuSelected: menuSelected });
}*/

export default class Test extends Component {
  constructor(props) {
    super(props);

    console.log();
    this.state = {
      menuSelected: "profile"
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(menuSelected) {
    this.setState({ menuSelected: menuSelected });
  }

  render() {
    return (
      <div className="Dash">
        <div className="col1">
          <div className="Picture">
            <Picture />
          </div>
          <div className="MainMenu">
            <MainMenu
              menuSelected={this.state.menuSelected}
              onMenuSelection={this.onSelect}
            />
          </div>
        </div>
        <div className="Canvas">
          <Canvas menuSelected={this.state.menuSelected} />
        </div>
      </div>
    );
  }
}
