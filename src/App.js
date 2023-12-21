import React from "react";
import "./App.css";
class DrumSet extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }
  play(event) {
    let div =
      event.type === "click"
        ? document.getElementById(event.target.textContent)
        : document.getElementById(event.key.toUpperCase());
    if (div) {
      if (this.props.power) {
        div.volume = this.props.volume / 100;
        div.currentTime = null;
        div.play();
        this.props.changeDisplay(div.parentElement.id);
      }
      div.parentElement.animate(
        [{}, { boxShadow: "none", backgroundColor: "orange" }],
        {
          duration: 150,
          iterations: 1,
        }
      );
    }
  }
  componentDidMount() {
    window.addEventListener("keydown", this.play);
  }
  render() {
    return (
      <div
        className="col-6 d-flex flex-wrap gap-2 justify-content-center align-items-stretch p-2"
        id="drums"
      >
        {[...Array(9).keys()].map((i) => (
          <div
            id={this.props.set[i].id}
            className="drum-pad"
            key={i}
            onClick={this.play}
          >
            <audio
              src={this.props.set[i].url}
              className="clip"
              id={this.props.set[i].keyTrigger}
            ></audio>
            <p>{this.props.set[i].keyTrigger}</p>
          </div>
        ))}
      </div>
    );
  }
}
class Controls extends React.Component {
  render() {
    return (
      <div className="col-6 text-center" id="controls">
        <div>
          <h4>Power</h4>
          <button
            id="togglePowerBtn"
            className={this.props.power ? "on" : "off"}
            onClick={this.props.togglePower}
          >
            {this.props.power ? "ON" : "OFF"}
          </button>
        </div>
        <div>
          <h4 id="display">{this.props.display}</h4>
          <input
            type="range"
            min="0"
            max="100"
            value={this.props.volume}
            className="form-range"
            id="myRange"
            onChange={this.props.changeVolume}
          />
        </div>
        <div>
          <h4>Bank</h4>
          <button
            id="toggleBankBtn"
            className={this.props.bank ? "on" : "off"}
            onClick={this.props.toggleBank}
          >
            {this.props.bank ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    );
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      volume: "50",
      bank: false,
      display: "Heater Kit",
    };
    this.togglePower = this.togglePower.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }
  togglePower() {
    this.setState((state) => ({
      power: !state.power,
    }));
  }
  changeVolume(event) {
    if (this.state.power)
      this.setState(() => ({
        volume: event.target.value,
        display: "Volume: " + event.target.value + "%",
      }));
  }
  toggleBank() {
    if (this.state.power)
      this.setState((state) => ({
        display: !state.bank ? "Smoooth Piano Kit" : "Heater Kit",
        bank: !state.bank,
      }));
  }
  changeDisplay(text) {
    this.setState(() => ({
      display: text,
    }));
  }
  render() {
    return (
      <div className="row" id="drum-machine">
        <DrumSet
          power={this.state.power}
          volume={this.state.volume}
          set={this.state.bank ? this.props.piano : this.props.drum}
          changeDisplay={this.changeDisplay}
        />
        <Controls
          togglePower={this.togglePower}
          changeVolume={this.changeVolume}
          toggleBank={this.toggleBank}
          power={this.state.power}
          volume={this.state.volume}
          bank={this.state.bank}
          display={this.state.display}
        />
      </div>
    );
  }
}
export default Container;
