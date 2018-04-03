import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FileUpload from './FileUpload';

class App extends Component {
  render() {
    const fileUpload = ( <FileUpload/> );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to JuniorLints</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {fileUpload}
      </div>
    );
  }
}

export default App;
