// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bio from './Bio';
import './FileUpload.css';

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
`;
const UploadButton = styled.input`

`;

class FileUpload extends Component {
  constructor(props) {
    super(props);


    this.state = {
      message: '',
    };
  }

  handleChange(file) {
    if (!file.name.endsWith('.py')) {
      this.setState({ message: 'Uploaded file was not a valid .py file.' });
      return;
    }

    this.props.startLoad();
    let contents;
    const callbackProp = this.props.callback;


    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      contents = reader.result;

      const request = new Request(
        '/submissions',
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
        });
    };
  }


  render() {
    const uploadButton = <UploadButton type="file" id="file" onChange={e => this.handleChange(e.target.files[0], this.props)} />;

    return (
      <div>
        <Instructions align="center">Begin by uploading your favorite Python file</Instructions>
        <ButtonLabel>
          {uploadButton} Choose File
        </ButtonLabel>
        <h1 align="center" >{this.state.message}</h1>
        <Bio />
      </div>
    );
  }
}

FileUpload.propTypes = {
  callback: PropTypes.func.isRequired,
  startLoad: PropTypes.func.isRequired,
};

export default FileUpload;
