// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import React, { Component } from 'react';
import './Viewer.css';

function formatLO(linterOutput){
  //Filter out unneccesary/advanced errors.
  let errors = linterOutput.slice();
  errors.sort((a1, a2) => a1.line - a2.line);
  console.log(errors);
  let r = "";
  errors.forEach((item) => {
    r += (`Line ${item.line}: ${item.message} \n`);
  });
  return(r);
}


class Viewer extends Component {
  constructor(props) {
    super(props);

  }

  render(props) {

    return(
      <div>
        <div id="flex-container">
          <div id="code">
            <h1 align = "left">Your code:</h1>
            <pre align = "left">{this.props.pyCode}</pre>
          </div>
          <div id="linterOutput">
            <h1 align = "left">Our feedback:</h1>
            <pre align = "left">{formatLO(this.props.linterOutput)}</pre>
          </div>
        </div>
        <div>
          <button onClick={()=> this.props.changeMode()}>Lint another file.</button>
        </div>
      </div>

    );
  }
}

export default Viewer;
