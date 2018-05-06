import React, { Component } from 'react';
import {Well} from 'react-bootstrap';
import styled from 'styled-components';
import './App.css';
import logo from './logo.png';

import FileUpload from './FileUpload';
import Viewer from './Viewer';
import Loading from './Loading';

const Button = styled.button`
background-color: DarkGray;
color: black;
font-size: 12px;
padding: 10px 15px;
margin: 15px;
border: none;
cursor: pointer;
border-radius: 3px;
text-align: center;
`;



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
    if (this.state.viewBio){
      bio = (
        <div align="left">
          <Button onClick={() => this.setState({viewBio: false})} >
            What is JuniorLints?
          </Button>
          <div>
          <Well >
            <p>
              "Linting" is the act of checking a piece of code for errors and bad style. "Static analysis" is code analysis that is performed without actually executing the code. <strong>JuniorLints</strong> will check your python code for some basic problems and style conventions. <strong>JuniorLints</strong> might not catch everything, but it will probably help!
            </p>
            <input
              type="image"
              src={logo}
              alt="logo"
              width="300px"
            />
          </Well>
          </div>
        </div>
      );
    } else {
      bio = (
        <div align="left">
          <Button onClick={() => this.setState({viewBio: true})} >
            What is JuniorLints?
          </Button>
        </div>
      )
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
