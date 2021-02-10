import React, { Component } from "react";
import axios from "axios";

/*import ReactToPrint from 'react-to-print';
import ComponentToPrint from "./service-order-print.component";*/

/*import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';*/

const APP_URL = "http://localhost:5001/airconditioners/";

const initialEquip = {
  furg: "",
  ebserh: "",
  location: "",
  type: "",
  function: "",
  btu: "",
  inmetro: "",
  efficiency: ""
};

var serviceOptions = [];
var partOptions = [];
var templateOptions = [];

export default class Companies extends React.Component {
  constructor(props) {
    super(props);

    this.selectMenu = this.selectMenu.bind(this);
    this.selectBoardInfo = this.selectBoardInfo.bind(this);

    this.boardInfo = this.boardInfo.bind(this);
    this.subMenu = this.subMenu.bind(this);

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.equipsList = this.equipsList.bind(this);

    this.state = {
      equips: [],
      /*maintenanceLog: [],
            renderMaintenanceLog: false,*/
      equipsMod: [],

      selectedDate: new Date("2019-08-18T21:11:54"),
      setSelectedDate: new Date("2019-08-18T21:11:54"),

      boardData: "data",
      newItem: "",

      date: new Date(),

      equipsSortBy: "name",

      equipSelectedId: "",
      equipSelected: initialEquip,

      maintenancesLog: [],

      addEquip: false,
      newFurg: "",
      newEbserh: "",

      typesSelected: [],
      menuType: ""
    };

    axios
      .get(APP_URL)
      .then((response) => {
        this.setState({
          equips: response.data,
          equipsMod: response.data,
          equipSelected: response.data[0]
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addItem(e) {
    let action = e.target.getAttribute("action");
    switch (action) {
      case "input":
        this.setState({ newItem: e.target.value });
        break;
      case "finish":
        let list = this.state.equipmentSelected;
        list[e.target.getAttribute("field")].push(this.state.newItem);

        list[e.target.getAttribute("field")].sort();

        console.log(list);

        axios
          .post(
            "http://localhost:5001/equipments/findByType/update/airconditioner/",
            list
          )
          .then((response) => {
            this.setState({
              equipmentSelected: list,
              newItem: ""
            });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  }

  deleteItem(e) {
    let list = this.state.equipmentSelected;
    let arr = list[e.target.getAttribute("field")];
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === e.target.value) {
        arr.splice(i, 1);
      }
    }
    arr.sort();

    console.log(arr);

    axios
      .post(
        "http://localhost:5001/equipments/findByType/update/airconditioner/",
        list
      )
      .then((response) => {
        this.setState({
          equipmentSelected: list,
          newItem: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  boardInfo() {
    let info = "";
    let data = "";
    switch (this.state.boardData) {
      case "equips":
        info = <div>{this.equipsList()}</div>;
        break;
      case "parts":
        data = this.state.equipmentSelected.parts;
        info = (
          <div>
            <p>Novo Item</p>
            <input
              onChange={this.addItem}
              action="input"
              value={this.state.newItem}
            ></input>
            <div>
              <button onClick={this.addItem} action="finish" field="parts">
                Adicionar
              </button>
            </div>
            {data.map((item, index) => {
              return (
                <div className="twenty" key={"item-container" + item}>
                  <p key={"item" + index}>{item}</p>
                  <button
                    key={"delete" + index}
                    onClick={this.deleteItem}
                    field="parts"
                    value={item}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        );
        break;
      case "services":
        data = this.state.equipmentSelected[this.state.boardData];
        info = (
          <div>
            <p>Novo Item</p>
            <input
              onChange={this.addItem}
              action="input"
              value={this.state.newItem}
            ></input>
            <div>
              <button
                onClick={this.addItem}
                action="finish"
                field={[this.state.boardData]}
              >
                Adicionar
              </button>
            </div>
            {data.map((item, index) => {
              return (
                <div className="twenty" key={"item-container" + item}>
                  <p key={"item" + index}>{item}</p>

                  <button
                    key={"delete" + index}
                    onClick={this.deleteItem}
                    field={[this.state.boardData]}
                    value={item}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        );
        break;
      case "maintenances":
        info = (
          <div>
            {!this.state.addEquip && (
              <div>
                <div className="container">{this.maintenancesLog()}</div>
              </div>
            )}
          </div>
        );
        break;
      case "periodics":
        {
          info = (
            <div>
              {!this.state.addEquip && (
                <div>
                  <div className="one">
                    <p>Observações</p>
                    <textarea
                      type="longinput"
                      value={"this.state.maintenanceSchedule.message"}
                      onChange={"this.maintSchHandler"}
                      action="change"
                      field="message"
                    />
                  </div>
                  <div>
                    <p>Serviços</p>
                    <div className="container">
                      <div className="half">
                        <p>Serviço</p>
                        <select
                          value={"this.state.maintenanceSchedule.newService"}
                          onChange={"this.maintSchHandler"}
                          action="change"
                          field="newService"
                        >
                          <option></option>
                          {"serviceOptions.map(MakeItem)"}
                        </select>
                      </div>
                      <div className="half">
                        <p>Objeto</p>
                        <select
                          value={"this.state.maintenanceSchedule.newPart"}
                          onChange={"this.maintSchHandler"}
                          action="change"
                          field="newPart"
                        >
                          <option></option>
                          {"partOptions.map(MakeItem)"}
                        </select>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={"this.maintSchHandler"}
                        action="addService"
                      >
                        Adicionar Serviço
                      </button>
                    </div>
                  </div>
                  <div className="one">
                    {!this.state.maintenanceEdit ? (
                      <button onClick={"this.maintSchHandler"} action="new">
                        Finalizar
                      </button>
                    ) : (
                      <button
                        onClick={"this.maintSchHandler"}
                        action="edit-save"
                      >
                        Salvar Alterações
                      </button>
                    )}
                  </div>
                  <div>{"this.scheduledMaintenanceServices()"}</div>
                </div>
              )}
            </div>
          );
        }
        break;
    }
    return info;
  }

  selectMenu(e) {
    let menu = e.target.value;

    this.setState({
      menuType: e.target.getAttribute("menuType"),
      boardData: ""
    });

    axios
      .get("http://localhost:5001/equipments/findByType/" + menu)
      .then((response) => {
        this.setState({ equipmentSelected: response.data[0] });
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    switch (menu) {
      case "airconditioner":
        {
          axios
            .get("http://localhost:5001/maintenances/equip/type/" + menu)
            .then((response) => {
              this.setState({ maintenancesLog: response.data });
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get("http://localhost:5001/equipments/findByType/airconditioner")
            .then((response) => {
              serviceOptions = response.data[0].services;
              partOptions = response.data[0].parts;
              templateOptions = response.data[0].ostemplates;
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get(APP_URL)
            .then((response) => {
              this.setState({
                equips: response.data,
                equipsMod: response.data,
                equipSelected: response.data[0]
              });
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        break;
    }
  }

  subMenu() {
    let info = [];
    switch (this.state.menuType) {
      case "equip":
        {
          info = (
            <div>
              <div>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="equips"
                >
                  Equipamentos
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="data"
                >
                  Dados
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="maintenances"
                >
                  Manutenções Agendadas
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="stats"
                >
                  Estatísticas
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="parts"
                >
                  Cadastro de Peças
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="services"
                >
                  Cadastro de Serviços
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="servicesLog"
                >
                  Log de Serviços
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="periodics"
                >
                  Serviços Periódicos
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="log"
                >
                  Log
                </button>
              </div>
              <div>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="config"
                >
                  Cadastros
                </button>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="config"
                >
                  Opções
                </button>
              </div>
            </div>
          );
        }
        break;
      case "equipMain":
        {
          info = (
            <div>
              <div>
                <button
                  onClick={this.selectBoardInfo}
                  val="boardData"
                  value="equipClass"
                >
                  Tipos de Equipamento
                </button>
              </div>
            </div>
          );
        }
        break;
    }
    return info;
  }

  equipsList() {
    let roomsArray = [];

    for (let i = 0; i < this.state.equipsMod.length; i++) {
      console.log("equips list executed");
      roomsArray.push(
        <div className="element" key={i}>
          <p>
            EBSERH: {this.state.equipsMod[i].ebserh} | FURG:{" "}
            {this.state.equipsMod[i].furg}
          </p>
          <p>Local: {this.state.equipsMod[i].location}</p>
          <p>Tipo: {this.state.equipsMod[i].type}</p>
          <button
            action="select"
            index={i}
            onClick={this.equipHandler}
            value={this.state.equipsMod[i]._id}
          >
            Visualizar
          </button>
        </div>
      );
    }

    return roomsArray;
  }

  maintenancesLog = () => {
    let info = [];
    let ref = this.state.maintenancesLog;
    let equip = this.state.equipSelected;

    for (let i = 0; i < ref.length; i++) {
      let services = this.state.maintenancesLog[i].services;
      console.log(services);
      let servicesScheduled = [];

      for (let ii = 0; ii < services.length; ii++) {
        servicesScheduled.push(
          <>
            {services[ii].newService} - {services[ii].newPart} |{" "}
          </>
        );
      }
      console.log(servicesScheduled);

      info.push(
        <div className="item quarter">
          <div className="third">
            <p>{equip.mtype}</p>
          </div>
          <div className="third">
            <p>{equip.status}</p>
          </div>
          <div className="third">
            <p>{equip.date}</p>
          </div>
          <div className="one">
            <p>{equip.message}</p>
          </div>
          <div>Serviços: {servicesScheduled}</div>
        </div>
      );
    }

    return info;
  };

  selectBoardInfo(e) {
    let val = e.target.value;
    console.log(val);
    this.setState({ boardData: val });
  }

  render() {
    console.log(this.state.menuType);
    return (
      <div id="canvas">
        <div className="menu">
          <div>
            <h1 className="title">
              <span>Informações</span>
            </h1>
            {this.subMenu()}
          </div>
          <div className="data"></div>

          <div className="info">{this.boardInfo()}</div>
        </div>
      </div>
    );
  }
}
