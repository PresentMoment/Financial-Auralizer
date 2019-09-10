import React, { Component } from "react";
import data from "../Data/daily_json.json";

let gasPrices = [];
export default class DataFetch extends Component {
  sendData = () => {
    let i = 0;
    setInterval(() => {
      if (i < gasPrices.length) {
        i++;
        this.props.parentCallback(gasPrices[i]);
      } else {
        clearInterval();
      }
    }, 100);
  };

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
        <button onClick={this.sendData}>Send Data</button>
      </div>
    );
  }
}