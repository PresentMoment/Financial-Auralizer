import React, { Component } from "react";
import Tone from "tone";
import DataFetch from "./DataFetch";

export default class Synth extends Component {
  constructor(props) {
    super(props);

    const synth = new Tone.AMSynth({
      oscillator: {
        type: "square",
        modulationType: "sawtooth",
        modulationIndex: 8,
        vibratomount: 0.5,
        harmonicity: 2
      },
      envelope: {
        attack: 1.03,
        decay: 0.6,
        sustain: 0.03,
        release: 1.8,
        attackCurve: "sine"
      },
      modulation: {
        volume: 0.9,
        type: "sine"
      },
      modulationEnvelope: {
        attack: 0.2,
        decay: 0.4,
        sustain: 0.1,
        release: 0.9
      },
      volume: 0,
      frequency: 0,
      portamento: 0
    }).toMaster();

    this.state = {
      gasValue: null,
      synth: synth
    };
  }

  callbackFunction = childData => {
    const synth = this.state.synth;
    synth.set("frequency", childData * -0.3);
    this.setState({ gasValue: childData * 0.5 });
  };
  componentDidMount() {
    this.audioContext = new AudioContext();
  }

  render() {
    if (this.state.gasValue != null) {
      this.state.synth.triggerAttackRelease("C4", "8n");
    }
    console.log(this.state);
    return (
      <div>
        <DataFetch parentCallback={this.callbackFunction} />
      </div>
    );
  }
}
