import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

import FileUpload from './FileUpload';
import Viewer from './Viewer';
import Loading from './Loading';


class App extends Component {
  constructor() {
    super();

    this.state = {
      pyCode: null,
      linterOutput: null,
      viewBio: null,
      mode: 'upload',
    };
  }


  render() {
    let comp;
    let bio;
    if (this.state.mode === 'upload') {
      comp = (
        <FileUpload
          callback={(userCode, userOutput) => this.setState({ pyCode: userCode, linterOutput: userOutput, mode: 'view' })}
          startLoad={() => this.setState({ mode: 'loading' })}
        />

      );
    }
    if (this.state.mode === 'view') {
      comp = (
        <Viewer
          pyCode={this.state.pyCode}
          linterOutput={this.state.linterOutput}
          changeMode={() => this.setState({ mode: 'upload' })}
        />);
    }
    if (this.state.mode === 'loading') {
      comp = (
        <Loading />
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JuniorLints</h1>
          <h3 className="App-subtitle">Online Static Analysis for Python</h3>
        </header>
        {comp}
        {bio}
      </div>
    );
  }
}

export default App;
