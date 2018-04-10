// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import React, { Component } from 'react';
// import axios, { post } from 'axios';

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

    const uploadButton = <input type="file" id="file" onChange={e => this.handleChange(e.target.files[0], this.props)} />;

    return (
      <div>
      <h3 align="center">Begin by uploading a Python file</h3>
        {uploadButton}
      </div>
    );
  }
}

export default FileUpload;
