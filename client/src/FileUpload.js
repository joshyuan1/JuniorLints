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

  handleChange(file) {
    let contents;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = function(){
      contents = reader.result;
      console.log(contents);

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
        .then((file) => {
          this.setState({ currentFile: file });
        })
        .catch(err => console.log(err));
      };
    }



  render() {
    const uploadButton = <input type="file" id="file" onChange={e => this.handleChange(e.target.files[0])} />;

    return (
      <div>
        {uploadButton}
      </div>
    );
  }
}

export default FileUpload;
