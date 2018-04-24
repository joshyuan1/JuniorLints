import styled from 'styled-components';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import PropTypes from 'prop-types';
import './Viewer.css';

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

function formatLO(linterOutput, pyCode) {
  // Filter out unneccesary/advanced errors.
  const numLines = pyCode.slice().split('\n').length;
  const a = new Array(numLines);
  a.fill('\n');
  const errors = linterOutput.slice();
  errors.forEach((item) => {
    a[item.line - 1] = (`Line ${item.line}: ${item.message} \n`);
  });
  return (a.join(''));
}

function errorColor(lineNumber) {
  // color based on error type
  const correct = {
    backgroundColor: '#dbffdb',
    display: 'block',
    padding: 0,
  };
  const incorrect = {
    backgroundColor: '#ffecec',
    display: 'block',
    padding: 0,
  };
  const defaultyyy = {};

  if (lineNumber === 21) {
    return correct;
  }
  if (lineNumber === 23) {
    return incorrect;
  }
  return defaultyyy;
}


function Viewer(props) {
  return (

    <div>
      <div className="flex-container">
        <div id="code">
          <h1 align="center">Your Code</h1>
          <pre align="left">
            <SyntaxHighlighter
              language="python"
              showLineNumbers
              style={docco}
              wrapLines
              lineProps={(lineNumber) => {
      const style = errorColor(lineNumber);
      return { style };
    }}
            >
              {props.pyCode}
            </SyntaxHighlighter>
          </pre>
        </div>
        <div id="linterOutput">
          <h1 align="center">Our Feedback</h1>
          <pre align="left">
            <SyntaxHighlighter
              language="shell"
              style={monokaiSublime}
            >
              {formatLO(props.linterOutput, props.pyCode)}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
      <div>
        <Button onClick={() => props.changeMode()}>Lint Another File</Button>
      </div>
    </div>

  );
}

Viewer.propTypes = {
  changeMode: PropTypes.func.isRequired,
  pyCode: PropTypes.string.isRequired,
  linterOutput: PropTypes.instanceOf(Object).isRequired,
};

export default Viewer;
