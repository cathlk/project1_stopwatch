import React from 'react';
import './App.css';

class Statewthis extends React.Component {
  constructor(props) {
    super(pros);
    
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
      isToggleOn: true 
    }
    // **** BIND behövs om vi inte har arrow function på startPause **** 
    this.startPause = this.startPause.bind(this);
    this.resetTime = this.resetTime.bind(this);
  };

  startPause() {
    this.setState({
      timerOn: true, 
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 100);
    
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    console.log('start pause btn');
  };

  resetTime () {
    this.setState({
      timerOn: false,
      timerTime: 0, 
      isToggleOn: true
    }); 

    clearInterval(this.timer);
    console.log('btn reset');
  };
  
  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>STOPWATCH </h1> 
          <div>
            <p> 
              {hours} : {minutes} : {seconds} : {centiseconds}
            </p>
            
            <p>
              {/* START / PAUSE  */}
              <button onClick={this.startPause}> 
                {this.state.isToggleOn ? 'START' : 'PAUSE'}  
                {this.state.timerOn === false && this.state.timerTime > 0} 
              </button> 

              {/* RESUME */}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.startPause}>Resume</button>
              )}
              {/* RESET */}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.resetTime}>Reset</button>
              )}

              {/* STOP */}
              {this.state.timerOn === true && (
                <button onClick={this.resetTime}>Stop</button>
              )}             
            </p>

            <p> toggle mm <br></br>
              <button onClick={this.startPause}> 
                {this.state.isToggleOn ? 'START' : 'PAUSE'} 
              </button> 

              <button onClick={this.resetTime}> RESET </button>
            </p>

            {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button onClick={this.startPause}> sTART </button>  
              )}

          </div>
  
          
        </header>
      </div>
    );
  };
}

export default Statewthis;
