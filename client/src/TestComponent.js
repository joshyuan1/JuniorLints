import React, { Component } from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const CODE = `const woah = fun => fun + 1;
const dude = woah(2) + 3;
function thisIsAFunction() {
  return [1,2,3].map(n => n + 1).filter(n !== 3);
}
console.log('making up fake code is really hard');

function itIs() {
  return 'no seriously really it is';
}`;


function errorColor(lineNumber){
  // color based on error type
  const transparent = {
    backgroundColor: 'transparent',
    padding: 0,
  };
  const red = {
    backgroundColor: 'red',
    padding: 0,
  };
  if (lineNumber === 3){
    return red;
  } 
  else {
    return transparent
  }
}


class TestComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {

    const ADDED = [1, 2];
    const REMOVED = [6];





    return (
      <div>
        <h1 style={{fontSize:42, color:'red'}}>React SyntaxHighlighter</h1>
        <div style={{paddingTop: 20, display: 'flex'}}>
          <div style={{flex: 1, width: '100%', flexDirection: 'column'}}>
            <SyntaxHighlighter 
              style={docco} 
              wrapLines={true}
              customStyle={lineNumber => {
                let style = errorColor(lineNumber)
                return style;
              }}
            >
              {CODE}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}

export default TestComponent;

