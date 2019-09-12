import React, { Component } from "react";
import data from "../Data/daily_json.json";

//Empty array that will recieve pushed price info from JSON file
let gasPrices = [];

export default class DataFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: null
    };
  }
  //Sends each change in gasPrices array up to parent component at interval defined at end of function
  sendData = () => {
    let i = 0;
    setInterval(() => {
      if (i < gasPrices.length) {
        i++;
        this.props.parentCallback(gasPrices[i]);
      } else {
        clearInterval();
      }
    }, this.state.dropDown);
  };

  dropDownChange = e => {
    this.setState({ dropDown: e.target.value });
  };

  //Filters JSON array for relevant dates and returns only the daily price to gasPrices array
  componentDidMount() {
    const originalData = data;
    originalData.forEach(element => {
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
  }

  render() {
    return (
      <div>
        <div className="DataFetch">
          <h1 onClick={this.sendData}>Send Data</h1>
        </div>
        <div className="RateSelect">
          <select onChange={this.dropDownChange}>
            <option value="1000">1000</option>
            <option value="100">100</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    );
  }
}
