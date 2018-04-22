// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import styled from 'styled-components';

import React, { Component } from 'react';

import './FileUpload.css';

import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';
import { ProgressBar } from 'react-fetch-progressbar';

// Let react-fetch-progressbar know what the original fetch is.
setOriginalFetch(window.fetch);

/* 
  Now override the fetch with progressBarFetch, so the ProgressBar
  knows how many requests are currently active.
*/
window.fetch = progressBarFetch;



const Instructions = styled.h3`
padding-top: 50px;
padding-bottom: 20px;
font-size: 20px;
`;

const ButtonLabel = styled.label`
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: DarkGray;
    color: black;
    font-size: 16px;
    padding: 16px 30px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    width: 100px;
`
;
const UploadButton = styled.input`

`;

class FileUpload extends Component {
  constructor(props) {
    super(props);



    this.state = { currentFile: null, }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(file, props) {
    let contents;
    var callbackProp = this.props.callback;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = function(){
      contents = reader.result;

      const request = new Request(
      '/submissions', // is it a problem that this doesn't exist?
      {
        method: 'POST',
        body: contents,
      },
      );

      fetch(request)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then((linterOutput) => {
          callbackProp(contents, linterOutput);
        })
        .catch(err => console.log(err));
      };
    }



  render(props) {

    const uploadButton = <UploadButton type="file" id="file" onChange={e => this.handleChange(e.target.files[0], this.props)} />;

    return (
      <div>
      <Instructions align="center">Begin by uploading your favorite Python file</Instructions>
      <ButtonLabel>
        {uploadButton} Choose File
      </ButtonLabel>
      <ProgressBar style={{ position: 'relative', backgroundColor: '#f0ad4e', height: '30px' }}/>
      </div>
    );
  }
}

export default FileUpload;
