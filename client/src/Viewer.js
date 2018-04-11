// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import styled from 'styled-components';

//import { Panel } from '../node_modules/reactstrap';

import React, { Component } from 'react';
import './Viewer.css';

const UserCodeTitle = styled.h1`
margin-left: 5%;
// padding-right: 5%;
`;

const LinterOutputTitle = styled.h1`
margin-left: 5%;
// margin-right: 5%;
`;

const UserCode = styled.pre`
margin-left: 5%;
// padding-left: 5%;
`;

const LinterOutput = styled.pre`
margin-left: 5%;
padding-right: 5%;
`;

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
        <div class="flex-container">
          <div id="code">
            <UserCodeTitle>Your code:</UserCodeTitle>
            <UserCode align = "left">{this.props.pyCode}</UserCode>
          </div>
          <div id="linterOutput">
            <LinterOutputTitle>Our feedback:</LinterOutputTitle>
            <LinterOutput align = "left">{formatLO(this.props.linterOutput)}</LinterOutput>
          </div>
        </div>
        <div>
          <Button onClick={()=> this.props.changeMode()}>Lint Another File</Button>
        </div>
      </div>

    );
  }
}

export default Viewer;
