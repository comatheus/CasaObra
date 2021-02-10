import React, { Component } from "react";
import Terrain from "../modules/terrains/terrains";

export default class MainMenu extends Component {
  menuSelection() {
    switch (this.props.menuSelected) {
      case "Perfil":
        return <p>Perfil</p>;
      case "Terrenos":
        return <Terrain />;
      default:
    }
  }

  render() {
    return (
      <div>
        <strong>Common Class Component</strong>
        {this.menuSelection()}
      </div>
    );
  }
}
