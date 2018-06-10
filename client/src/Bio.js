import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import styled from 'styled-components';
import logo from './logo.png';

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

class Bio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewBio: false,
    };
  }

  render() {
    if (this.state.viewBio) {
      return (
        <div align="left">
          <Button onClick={() => this.setState({ viewBio: false })} >
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
    }
    return (
      <div align="left">
        <Button onClick={() => this.setState({ viewBio: true })} >
            What is JuniorLints?
        </Button>
      </div>
    );
  }
}


export default Bio;
