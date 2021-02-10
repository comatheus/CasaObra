import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./terrains.css";

const subPages = ["Meus Terrenos", "Cadastrar Terreno", "Estatísticas"];

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.suPage = this.subPage.bind(this);
    this.listSubPages = this.listSubPages.bind(this);
    this.subPageSelection = this.subPageSelection.bind(this);

    this.state = {
      view: "main",
      terrainSelected: "",
      showForm: false,
      showPanorama: false,
      hasPanorama: false,

      terrainsList: []
    };
  }

  /*componentDidMount() {
    axios.get("http://localhost:5001/modules/terrains/")
    .then(response => {
        this.setState({ terrainList: response.data, renderMaintenanceLog: true})
        console.log(response.data)
        })
    .catch((error) => {
        console.log(error);
        })
  }*/

  listSubPages() {
    let menuButtons = subPages.map((subPageItem) => (
      <button
        onClick={this.subPageSelection}
        value={subPageItem}
        className="subPageItem"
      >
        {subPageItem}
      </button>
    ));
    return menuButtons;
  }

  terrainSelection() {
    this.setState({ view: "product" });
    /*axios.get("http://localhost:5001/modules/terrains/"  + terrainSelected)
    .then(response => {
        this.setState({ terrainList: response.data, renderMaintenanceLog: true})
        console.log(response.data)
        })
    .catch((error) => {
        console.log(error);
        })*/
  }

  subPageSelection() {
    this.setState({ view: "product" });
  }

  subPage() {
    switch (this.state.view) {
      case "main":
        return <p>Hello Darling</p>;
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div>{this.subPage()}</div>
        <div className="subPageMenu">{this.listSubPages()}</div>
      </div>
    );
  }
}
