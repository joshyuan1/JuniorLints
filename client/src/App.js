import React, { Component } from 'react';

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
      mode: 'upload',
    };
  }

  // Set errorTypes prop as array of Pylint error types
  // getErrorTypes(pyCode, linterOutput) {
  //   const splitCode = pyCode.slice().split('\n'); // array of lines of code
  //   const errorTypeArray = new Array(splitCode.length);
  //   const errors = linterOutput.slice();
  //   errors.forEach((item) => {
  //     if (errorCodes.includes(item['message-id'])) {
  //       // if this alrady exists (if its non empty) set type to 'multiple'
  //       errorTypeArray[item.line] = (`${item.type}`);
  //     }
  //   });
  //   this.state.errorTypes = errorTypeArray;
  // }

  render() {
    let comp;
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
      </div>
    );
  }
}

export default App;
