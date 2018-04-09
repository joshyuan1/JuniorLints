import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FileUpload from './FileUpload';
import Viewer from './Viewer';

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
       //comp = (<div>{this.state.pyCode}</div>);
       console.log(JSON.stringify(this.state.linterOutput));
       comp = (
         <Viewer
          pyCode = {this.state.pyCode}
          linterOutput = {this.state.linterOutput}
          changeMode = {()=> this.setState({mode: 'upload'})}
        />)
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
