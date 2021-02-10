import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

/*import logo from './logo.svg';*/

const APP_URL = "http://localhost:5000/rooms/";

const Modules = ["Perfil", "Terrenos", "Imóveis"];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: true
    };

    this.selectMenu = this.selectMenu.bind(this);
    this.listMenus = this.listMenus.bind(this);
  }

  selectMenu(e) {
    let menu = e.target.value;
    this.props.onMenuSelection(e.target.value);
    console.log(menu);

    this.setState({
      menuType: e.target.getAttribute("menuType"),
      boardData: ""
    });

    /*axios.get("http://localhost:5001/equipments/findByType/" + menu)
    .then(response => {
            this.setState({equipmentSelected: response.data[0]});
            console.log(response.data[0]);
        })
    .catch((error) => {
        console.log(error);
        })*/

    switch (menu) {
      case "test":
        console.log(menu);

        /*axios.get("http://localhost:5001/maintenances/equip/type/" + menu)
            .then(response => {
                this.setState({ maintenancesLog: response.data});
                console.log(response.data);
                })
            .catch((error) => {
                console.log(error);
                })

            axios.get("http://localhost:5001/equipments/findByType/airconditioner")
            .then(response => {
                    serviceOptions = response.data[0].services;
                    partOptions = response.data[0].parts;
                    templateOptions = response.data[0].ostemplates;
                    console.log(response);
                })
            .catch((error) => {
                console.log(error);
                })
    
            axios.get(APP_URL)
            .then(response => {
                this.setState({ equips: response.data, equipsMod: response.data, equipSelected: response.data[0] })
                console.log(response.data);
                })
            .catch((error) => {
                console.log(error);
                })*/
        break;
      default:
    }
  }

  listMenus() {
    let menuButtons = Modules.map((module) => (
      <button onClick={this.selectMenu} value={module} className="menuItem">
        {module}
      </button>
    ));
    return menuButtons;
  }

  render() {
    return <div>{this.listMenus()}</div>;
  }
}
