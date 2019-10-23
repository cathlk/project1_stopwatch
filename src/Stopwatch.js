import React from "react";
import "./App.css";

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      elapsedTime: 0,
      timerPaused: true,
      splitTime: 0
    };

    // **** Denna behövs om vi inte har arrow function på functions för this ska fungera func körs ****
    this.startPause = this.startPause.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.addSplitTime = this.addSplitTime.bind(this);
  }

  startPause() {
    if (!this.state.timerPaused) {
      clearInterval(this.timer);
    } else {
      this.setState({
        startTime: Date.now() - this.state.elapsedTime
      });

      this.timer = setInterval(() => {
        this.setState({
          elapsedTime: Date.now() - this.state.startTime
        });
      }, 100);
    }

    this.setState({
      timerPaused: !this.state.timerPaused
    });
  }

  addSplitTime() {
    this.setState({
      splitTime: this.state.elapsedTime
    });
  }

  resetTime() {
    this.setState({
      elapsedTime: 0,
      timerPaused: true,
      splitTime: 0
    });

    clearInterval(this.timer);
  }

  render() {
    const { elapsedTime, splitTime } = this.state;
    let centiseconds = ("0" + (Math.floor(elapsedTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(elapsedTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(elapsedTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(elapsedTime / 3600000)).slice(-2);

    let centisec = ("0" + (Math.floor(splitTime / 10) % 100)).slice(-2);
    let sec = ("0" + (Math.floor(splitTime / 1000) % 60)).slice(-2);
    let min = ("0" + (Math.floor(splitTime / 60000) % 60)).slice(-2);
    let hour = ("0" + Math.floor(splitTime / 3600000)).slice(-2);

    return (
      <div className="App">
        <header className="App-header">
          <h1>STOPWATCH </h1>
          <div>
            <div>
              {hours} : {minutes} : {seconds} : {centiseconds}
            </div>

            <div>
              <button onClick={this.startPause}>
                {this.state.timerPaused ? "START" : "PAUSE"}
              </button>

              {this.state.timerPaused === false &&
                this.state.elapsedTime > 0 && (
                  <button onClick={this.addSplitTime}>SPLIT TIME </button>
                )}

              {this.state.timerPaused === true &&
                this.state.elapsedTime > 0 && (
                  <button onClick={this.resetTime}>RESET </button>
                )}
            </div>

            <div>
              {this.state.splitTime !== 0 && (
                <ol>
                  <h3>SPLIT TIME</h3>
                  <li>{hour} : {min} : {sec} : {centisec} </li>
                </ol>
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Stopwatch;