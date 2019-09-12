import React, { Component } from "react";
import gasData from "../Data/gasprices.json";
import voaltility from "../Data/volatility.json";

//Empty arrays that will recieve pushed price info from JSON file
let gasPrices = [];
let volatilityData = [];

export default class DataFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: null,
      dataSet: "gasPrices"
    };
  }
  //Sends each change in gasPrices array up to parent component at interval defined at end of function
  sendData = () => {
    let i = 0;
    if (this.state.dataSet === "gasPrices") {
      setInterval(() => {
        if (i < gasPrices.length) {
          i++;
          this.props.parentCallback(gasPrices[i]);
        } else {
          clearInterval();
        }
      }, this.state.dropDown);
    } else {
      setInterval(() => {
        if (i < volatilityData.length) {
          i++;
          this.props.parentCallback(volatilityData[i]);
        } else {
          clearInterval();
        }
      }, this.state.dropDown);
    }
  };

  dropDownChange = e => {
    this.setState({ dropDown: e.target.value });
  };

  dataDropDown = e => {
    this.setState({ dataSet: e.target.value });
  };

  //Filters JSON array for relevant dates and returns only the daily price to gasPrices array
  componentDidMount() {
    //fetch gas price data from JSON
    const originalGasData = gasData;
    originalGasData.forEach(element => {
      if (
        element.Date.includes("2006") ||
        element.Date.includes("2007") ||
        element.Date.includes("2008") ||
        element.Date.includes("2009") ||
        element.Date.includes("2010") ||
        element.Date.includes("2011") ||
        element.Date.includes("2012") ||
        element.Date.includes("2013") ||
        element.Date.includes("2014") ||
        element.Date.includes("2015") ||
        element.Date.includes("2016") ||
        element.Date.includes("2017") ||
        element.Date.includes("2018") ||
        element.Date.includes("2019")
      ) {
        gasPrices.push(element.Price);
      }
    });

    //fetch voaltility data from JSON
    const originalVolatility = voaltility;
    originalVolatility.forEach(element => {
      if (
        element.Date.includes("2006") ||
        element.Date.includes("2007") ||
        element.Date.includes("2008") ||
        element.Date.includes("2009") ||
        element.Date.includes("2010") ||
        element.Date.includes("2011") ||
        element.Date.includes("2012") ||
        element.Date.includes("2013") ||
        element.Date.includes("2014") ||
        element.Date.includes("2015") ||
        element.Date.includes("2016") ||
        element.Date.includes("2017") ||
        element.Date.includes("2018") ||
        element.Date.includes("2019")
      ) {
        volatilityData.push(element["VIX Close"]);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="DataFetch">
          <div className="DataSelect">
            <p>Select Data Set:</p>
            <select onChange={this.dataDropDown}>
              <option value="gasPrices">Crude Oil Prices</option>
              <option value="volatilityData">Volatility Index</option>
            </select>
            <p>Select Playback Rate:</p>
            <select onChange={this.dropDownChange}>
              <option value="1000">1000 milliseconds</option>
              <option value="100">100 milliseconds</option>
              <option value="10">10 milliseconds</option>
            </select>
          </div>
          <h1 onClick={this.sendData}>Send Data</h1>
        </div>
      </div>
    );
  }
}
