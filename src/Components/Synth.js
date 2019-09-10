import React, { Component } from "react";
import Tone from "tone";
import DataFetch from "./DataFetch";

export default class Synth extends Component {
  constructor(props) {
    super(props);

    const synth = new Tone.DuoSynth({
      oscillator: {
        type: "square",
        modulationType: "square",
        modulationIndex: 20,
        vibratomount: 0.5,
        harmonicity: 0
      },
      envelope: {
        attack: 0.93,
        decay: 0.6,
        sustain: 0.03,
        release: 1.1,
        attackCurve: "sine"
      },
      modulation: {
        volume: 0.2,
        type: "square"
      },
      modulationEnvelope: {
        attack: 2,
        decay: 0.04,
        sustain: 0.1,
        release: 0.9
      },
      volume: -1,
      frequency: 0,
      portamento: 0
    }).toMaster();

    this.state = {
      gasValue: null,
      synth: synth
    };

    this.handleClick = () => {
      synth.triggerAttack("C4", "8n");
    };
  }

  callbackFunction = childData => {
    const synth = this.state.synth;
    synth.set("frequency", childData * 0.1);
    this.setState({ gasValue: childData * 0.1 });
  };
  componentDidMount() {
    this.audioContext = new AudioContext();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <button className="Synth" onClick={this.handleClick}>
          Play
        </button>
        <DataFetch parentCallback={this.callbackFunction} />
      </div>
    );
  }
}
