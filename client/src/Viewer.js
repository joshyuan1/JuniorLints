// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import styled from 'styled-components';

//import { Panel } from '../node_modules/reactstrap';

import React, { Component } from 'react';
import './Viewer.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';


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

    const line = "hello this is the whole line";

    return(

      <div>
        <div className="flex-container">
          <div id="code">
            <h1 align = "center">Your Code</h1>
            <pre align = "left">
              <SyntaxHighlighter 
                language='python' 
                showLineNumbers={true} 
                style={monokaiSublime}
                wrapLines={true}
              >
                {this.props.pyCode}
              </SyntaxHighlighter>
            </pre>
          </div>
          <div id="linterOutput">
            <h1 align = "center">Our Feedback</h1>
            <pre align = "left">
              <SyntaxHighlighter 
                language='shell'
                style={monokaiSublime}
              >
                {formatLO(this.props.linterOutput, this.props.pyCode)}
              </SyntaxHighlighter>
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
