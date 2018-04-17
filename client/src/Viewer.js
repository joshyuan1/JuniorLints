// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import styled from 'styled-components';

//import { Panel } from '../node_modules/reactstrap';

import React, { Component } from 'react';
import './Viewer.css';
import Highlight from 'react-highlight.js'

const Button = styled.button`
    background-color: DarkGray;
    color: black;
    font-size: 16px;
    padding: 20px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    text-align: center;
`;

function formatLO(linterOutput, pyCode){
  //Filter out unneccesary/advanced errors.
  const numLines = pyCode.slice().split("\n").length;
  const a = new Array(numLines);
  a.fill("\n");
  let errors = linterOutput.slice();
  errors.forEach((item) => {
    a[item.line - 1]= (`Line ${item.line}: ${item.message} \n`);
  });
  return(a.join(""));
}


class Viewer extends Component {
  constructor(props) {
    super(props);

  }

  render(props) {

    return(

      <div>
        <div className="flex-container">
          <div id="code">
            <h1 align = "center">Your Code</h1>
            <pre align = "left">
              <Highlight language={'python'}>
                {this.props.pyCode}
              </Highlight>
            </pre>
          </div>
          <div id="linterOutput">
            <h1 align = "center">Our Feedback</h1>
            <pre align = "left">
              <Highlight language={'shell session'}>
                {formatLO(this.props.linterOutput, this.props.pyCode)}
              </Highlight>
            </pre>
          </div>
        </div>
        <div>
          <Button onClick={()=> this.props.changeMode()}>Lint Another File</Button>
          <h1> </h1>
        </div>
      </div>

    );
  }
}

export default Viewer;
