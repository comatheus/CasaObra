import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./terrains.css";

const subPages = [
  ["Meus Terrenos", "products"],
  ["Cadastrar Terreno", "new"],
  ["Estatísticas", "stats"]
];

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.suPage = this.subPage.bind(this);
    this.listSubPages = this.listSubPages.bind(this);
    this.subPageSelection = this.subPageSelection.bind(this);

    this.state = {
      subPage: "products",
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
        value={subPageItem[1]}
        className="subPageItem"
      >
        {subPageItem[0]}
      </button>
    ));
    return menuButtons;
  }

  terrainSelection(e) {
    this.setState({ subPage: "products" });
    /*axios.get("http://localhost:5001/modules/terrains/"  + terrainSelected)
    .then(response => {
        this.setState({ terrainList: response.data, renderMaintenanceLog: true})
        console.log(response.data)
        })
    .catch((error) => {
        console.log(error);
        })*/
  }

  subPageSelection(e) {
    console.log(e.target.value);
    this.setState({ subPage: e.target.value });
  }

  subPage() {
    switch (this.state.subPage) {
      case "products":
        return <p>Hello Darling</p>;
        break;
      default:
    }
  }

  render() {
    return (
      <div className="subPageMenu">
        <div>{this.listSubPages()}</div>
        <div>{this.subPage()}</div>
      </div>
    );
  }
}
