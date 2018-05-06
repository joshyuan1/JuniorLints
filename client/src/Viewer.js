  import styled from 'styled-components';
import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import PropTypes from 'prop-types';
import './Viewer.css';
import errorCodes from './errorCodes.json';

const Button = styled.button`
background-color: DarkGray;
color: black;
font-size: 16px;
padding: 20px 30px;
margin: 30px;
border: none;
cursor: pointer;
border-radius: 3px;
text-align: center;
`;

// creates error message for custom errors (not in Pylint/PEP-8)
function makeErrorMsg(line, code, msg) {
  return ({ line, 'message-id': code, message: msg });
}

// checks frequency of comments throughout Python code
function checkComments(splitCode) {
  let commentCount = 0;
  let lineCount = 0;
  splitCode.forEach((line) => {
    if (line.includes('#')) { commentCount += 1; }
    if (line.trim()) { lineCount += 1; }
  });
  if (commentCount / lineCount < 0.03) {
    return ([makeErrorMsg(1, '00000', 'Code has very few comments')]);
  }
  return ([]);
}

// checks for consecutive blank lines throughout Python code
function checkBlankLines(splitCode) {
  let lastCode = 0;
  let currentLine = 1;
  const blankLineErrors = [];
  splitCode.forEach((line) => {
    if (line.trim()) { lastCode = currentLine; }
    if (currentLine - lastCode > 3) { blankLineErrors.push(makeErrorMsg(lastCode + 1, '11111', 'Excessive number of blank lines')); }
    currentLine += 1;
  });
  return blankLineErrors;
}

// formats the Pylint output to be displayed in the feedback window
function formatLO(pyCode, linterOutput) {
  // Filter out unneccesary/advanced errors.
  const splitCode = pyCode.slice().split('\n'); // array of lines of code
  // make first error in first line number of comments (i.e. prepend to linterOutput)
  const customErrors = checkBlankLines(splitCode).concat(checkComments(splitCode));
  const a = new Array(splitCode.length);

  a.fill('\n');

  let errors = linterOutput.slice().concat(customErrors);
  errors = filterUndefinedVars(splitCode, errors);

  errors.forEach((item) => {
    if (errorCodes.includes(item['message-id'])) { //remove uncessary errors
      a[item.line - 1] = `(Line ${item.line}: ${item.message.trim()}) `.concat(a[item.line - 1]);
    }
  });
  return (a.join(''));
}

function filterUndefinedVars(splitCode, errors){
  let result =  errors;
  splitCode.forEach((line) => {
    if (line.includes("import") && line.includes("*")){
      console.log(line);
      result = errors.filter((error) => error['message-id'] !== "E0602"); //remove undefined variable errors
    }
  });
  return result;
}

// Set errorTypes prop as array of Pylint error types
function getErrorTypes(pyCode, linterOutput) {
  const splitCode = pyCode.slice().split('\n'); // array of lines of code
  const errorTypeArray = new Array(splitCode.length);
  const errors = linterOutput.slice();
  errors.forEach((item) => {
    if (errorCodes.includes(item['message-id'])) {
      // if this alrady exists (if its non empty) set type to 'multiple'
      errorTypeArray[item.line] = (`${item.type}`);
    }
  });
  return errorTypeArray;
}

// Applies colored hightling to each error-containing line
function errorColor(errorTypes, lineNumber) {
  let color;

  if (errorTypes[lineNumber]) {
    if (errorTypes[lineNumber] === 'convention') {
      color = '#dbffdb'; // green
    } else if (errorTypes[lineNumber] === 'warning') {
      color = '#ffffb3'; // yellow
    } else if (errorTypes[lineNumber] === 'refactor') {
      color = '#e6b3e6'; // pink
    } else if (errorTypes[lineNumber] === 'error' || errorTypes[lineNumber] === 'fatal') {
      color = '#ffecec'; // red
    }
  }

  const format = {
    backgroundColor: color,
    display: 'block',
    padding: 0,
  };
  return format;
}

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formattedLO: formatLO(this.props.pyCode, this.props.linterOutput),
      errorTypes: getErrorTypes(this.props.pyCode, this.props.linterOutput),
    };
  }

  render() {
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
        const style = errorColor(this.state.errorTypes, lineNumber);
        return { style };
      }}
              >
                {this.props.pyCode}
              </SyntaxHighlighter>
            </pre>
          </div>
          <div id="linterOutput">
            <h1 align="center">Our Feedback</h1>
            <pre align="left">
              <SyntaxHighlighter
                language="shell"
                style={docco}
              >
                {this.state.formattedLO}
              </SyntaxHighlighter>
            </pre>
          </div>
        </div>
        <div>
          <Button onClick={() => this.props.changeMode()}>Lint Another File</Button>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  changeMode: PropTypes.func.isRequired,
  pyCode: PropTypes.string.isRequired,
  linterOutput: PropTypes.instanceOf(Object).isRequired,
};

export default Viewer;
