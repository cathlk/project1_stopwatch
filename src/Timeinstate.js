import React from "react";
import "./App.css";

class Timeinstate extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      elapsedTime: 0,
      timerPaused: true,
      lapTime: null,
      centiseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0
    };

    // **** Denna behövs om vi inte har arrow function på functions för this ska fungera func körs ****
    this.startPause = this.startPause.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.addSplitTime = this.addSplitTime.bind(this);
  }

  startPause() {
    if (!this.state.timerPaused) {
      clearInterval(this.timer);
      console.log("JAG KÖRS INTE!");
    } else {
      this.setState({
        startTime: Date.now() - this.state.elapsedTime
      });

      this.timer = setInterval(() => {
        this.setState({
          elapsedTime: Date.now() - this.state.startTime,
          centiseconds: (
            "0" +
            (Math.floor(this.state.elapsedTime / 10) % 100)
          ).slice(-2),
          seconds: (
            "0" +
            (Math.floor(this.state.elapsedTime / 1000) % 60)
          ).slice(-2),
          minutes: (
            "0" +
            (Math.floor(this.state.elapsedTime / 60000) % 60)
          ).slice(-2),
          hours: ("0" + Math.floor(this.state.elapsedTime / 3600000)).slice(-2)
        });
      }, 100);

      console.log("JAG KÖÖÖÖRS!");
    }

    this.setState({
      timerPaused: !this.state.timerPaused
    });
  }

  addSplitTime() {
    this.setState({
      lapTime: ("0" + (Math.floor(this.state.elapsedTime / 1000) % 60)).slice(
        -2
      )
    });

    // console.log(lapedtime);
  }

  resetTime() {
    this.setState({
      elapsedTime: 0,
      timerPaused: true,
      lapTime: null
    });

    clearInterval(this.timer);
    console.log("btn reset");
  }

  render() {
    const { centiseconds, seconds, minutes, hours } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>TimeInState </h1>
          <div>
            <p>
              {hours} : {minutes} : {seconds} : {centiseconds}
            </p>

            <p>
              <button onClick={this.startPause}>
                {this.state.timerPaused ? "START" : "PAUSE"}
              </button>

              {this.state.timerPaused === false &&
                this.state.elapsedTime > 0 && (
                  <button onClick={this.addSplitTime}>SPLITTIME </button>
                )}

              {this.state.timerPaused === true &&
                this.state.elapsedTime > 0 && (
                  <button onClick={this.resetTime}>RESET </button>
                )}
            </p>

            <p>{this.state.lapTime}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default Timeinstate;
