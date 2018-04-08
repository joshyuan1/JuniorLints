import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FileUpload from './FileUpload';

class App extends Component {
  constructor(){
    super();

    this.state = {
      pyCode: null,
      linterOutput: null,
      mode: 'upload'
    }
  }

  render() {
    const fileUpload = (
       <FileUpload callback = {(userCode, userOutput) => this.setState({pyCode: userCode, linterOutput: userOutput, mode:'view'})}/>
     );

     let comp;
     if (this.state.mode === 'upload'){
       comp = fileUpload;
     } else {
       comp = (<div>{this.state.pyCode}</div>);
       //comp = <Viewer pyCode = {this.state.pyCode} linterOutput = {this.state.linterOutput}>
     }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to JuniorLints</h1>
        </header>
        {comp}
      </div>
    );
  }
}

export default App;
