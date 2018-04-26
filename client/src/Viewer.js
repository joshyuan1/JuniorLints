import styled from 'styled-components';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import PropTypes from 'prop-types';
import './Viewer.css';
import errorCodes from './errorCodes';

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
  const splitCode = pyCode.slice().split('\n'); //array of lines of code
  const customErrors = checkComments(splitCode).concat(checkBlankLines(splitCode)); //make first error in first line (i.e. prepend to linterOutput)
  console.log(customErrors);
  const a = new Array(splitCode.length);
  a.fill('\n');
  const errors = customErrors.concat(linterOutput.slice());
  errors.forEach((item) => {if(errorCodes.includes(item["message-id"])){
    a[item.line - 1] = (`Line ${item.line}: ${item.message} \n`);
  }});
  return (a.join(''));
}

function checkComments(splitCode){
  let commentCount = 0;
  let lineCount = 0;
  splitCode.forEach((line) => {
    if(line.includes("#")){commentCount+=1};
    if(line.trim()){lineCount+=1};
  });
  if(commentCount/lineCount < .05){
    return([makeErrorMsg(1, "00000", "Code has very few comments.")]);
  }
  return([]);
}

function checkBlankLines(splitCode){
  let lastCode = 0;
  let currentLine = 1;
  let blankLineErrors = [];
  splitCode.forEach((line) => {
    if(line.trim()){lastCode = currentLine};
    if(currentLine - lastCode > 3){blankLineErrors.push(makeErrorMsg(lastCode+1, "11111", "Excessive number of blank lines."))};
    currentLine += 1;
  });
  return blankLineErrors;
}

function makeErrorMsg(line, code, msg){
  return({"line": line, "message-id": code, "message":msg});
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
