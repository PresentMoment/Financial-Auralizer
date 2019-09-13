import React, { Component } from "react";
import Tone from "tone";
import DataFetch from "./DataFetch";

let textBox = "";

export default class Synth extends Component {
  constructor(props) {
    super(props);

    //Defines default sound parameters for synth engine

    const synth = new Tone.AMSynth({
      oscillator: {
        type: "square",
        modulationType: "sawtooth",
        modulationIndex: 2,
        vibratomount: 0.5,
        harmonicity: 7
      },
      envelope: {
        attack: 0.03,
        decay: 0.6,
        sustain: 0.03,
        release: 1.8,
        attackCurve: "sine"
      },
      modulation: {
        volume: 0.9,
        type: "triangle"
      },
      modulationEnvelope: {
        attack: 0.2,
        decay: 0.4,
        sustain: 0.1,
        release: 0.9
      },
      volume: -6,
      frequency: 0,
      portamento: 0
    }).toMaster();

    //gasValue is used to start sound engine when DataFetch changes state from null
    this.state = {
      gasValue: null,
      dataSet: "gasPrices",
      synth: synth
    };
  }

  //this function recieves data from child component(DataFetch) and sets the state at each iteration defined in setInterval in DataFetch
  //conditional stops setting synth param when array fully iterates
  callbackFunction = childData => {
    const synth = this.state.synth;
    if (typeof childData === "number") {
      synth.set("oscillator", { frequency: childData });
    } else {
    }
    this.setState({ gasValue: childData });
  };

  dataDisplay = propsData => {
    this.setState({ dataSet: propsData });
  };

  //audioContext starts the web audio engine at mounting to avoid browser errors when the synth is triggered
  componentDidMount() {
    this.audioContext = new AudioContext();
  }

  render() {
    //listens to the state of gasValue and triggers the synth engine once DataFetch begins manipulating the state
    //disconnects synth from master output (computer speakers) once array iteration in DataFetch completes
    if (this.state.gasValue != null) {
      this.state.synth.triggerAttackRelease("C2", "8n");
    } else if (this.state.gasValue === undefined) {
      // Audio.masterGainNode.gain.setValueAtTime(0);
      this.state.synth.triggerRelease();
    }

    //checks to see what data set is being passed up through props and sets data ticker display accordingly, clears out when array is fully iterated
    if (this.state.gasValue === null && this.state.dataSet === "gasPrices") {
      this.textBox = "Price of Natural Gas";
    } else if (
      this.state.gasValue === null &&
      this.state.dataSet === "volatilityData"
    ) {
      this.textBox = "Volatility Index";
    } else if (this.state.gasValue === undefined) {
      this.textBox = "";
    } else {
      this.textBox = "$" + this.state.gasValue;
    }

    return (
      <div className="App">
        <DataFetch
          parentCallback={this.callbackFunction}
          selectedData={this.dataDisplay}
        />
        <div className="gasPrice">
          <p>{this.textBox}</p>
        </div>
      </div>
    );
  }
}
