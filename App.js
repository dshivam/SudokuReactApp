import React, { Component } from 'react';
import {sudokuGenerator, removeKDigits} from './src/sudokuGenerator';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solvedMat: [],
            unsolvedMat: []
        }
        this.onInput = this.onInput.bind(this);
        this.timer = this.timer.bind(this);
        this.add = this.add.bind(this);
        this.seconds =0;
        this.minutes = 0;
        this.hours = 0;
    }
   
    componentWillMount() {
     const matrix = sudokuGenerator();
     const solvedMatrixCpy = [];
     for (let i = 0; i < 9; i += 1) {
         solvedMatrixCpy.push(matrix[i].slice());
     }
     const unsolvedMatrix = removeKDigits(solvedMatrixCpy);
     this.setState({
        solvedMat: matrix,
        unsolvedMat: unsolvedMatrix,
        timer: '00:00:00'
     });
    }
    componentDidMount() {
           this.timer();
    }
    onInput(event, key, cellId) {
      if (event.target.value != this.state.solvedMat[key][cellId] && event.target.value !== '') {
          document.getElementById('input'+key.toString() + cellId).style.backgroundColor = 'red';
          event.target.style.backgroundColor = 'red';
      } else if (event.target.value == this.state.solvedMat[key][cellId] || event.target.value === '') {
        document.getElementById('input'+key.toString() + cellId).style.backgroundColor = 'white';
        event.target.style.backgroundColor = 'white';
    }
    }
     add() {
         let seconds = this.seconds;
         let minutes = this.minutes;
         let hours = this.hours;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        const time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
       document.getElementById('timer').textContent = time;
       this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
        this.timer();
    }
     timer() {
        let t = setTimeout(this.add, 1000);
    }
    render() {
        console.log('Printing sudoku matrix');
        console.log(this.state.solvedMat);
        console.log(this.state.unsolvedMat);
        return(
            <div className="my-app">
                <div className="row">
                    <div className="sudoku col-6 mx-auto">
                        <div className="row">
                            <h className="col-5">Here is the puzzle. Good luck!</h>
                            <p id="timer" className="col-4">{this.state.timer}</p>
                        </div>
                        {this.state.unsolvedMat.map((item, key) => {
                            return (
                                <div className="row">
                                    {item.map((cellValue, cellId) => {
                                        let cellClass = "col-lg-1 cell";
                                        if ((cellId + 1) % 3 === 0) {
                                            cellClass += " thick-right-border";
                                        }
                                        if ((key + 1) % 3 === 0) {
                                            cellClass += " thick-bottom-border";
                                        }
                                        if (key === 0) {
                                            cellClass += " thick-top-border";
                                        }
                                        if (cellId === 0) {
                                            cellClass += " thick-left-border";
                                        }
                                        if (cellValue !== 0) {
                                      return (
                                          <div className={cellClass}>
                                          {cellValue}
                                          </div>
                                      );
                                        }
                                        return (
                                            <div id={'input'+key.toString()+cellId} className={cellClass}>
                                           <input type="text" onChange={(event) => {this.onInput(event, key, cellId)}}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
