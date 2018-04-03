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
    console.log('uploaded'); // test code
    console.log(file);

    const request = new Request(
      '/submissions/',
      {
        method: 'POST',
        body: JSON.stringify(file),
        headers: new Headers({ 'Content-type': 'application/json' }),
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

  render() {
    const uploadButton = <input type="file" id="file" onChange={e => this.handleChange(e.target.files)} />;

    return (
      <div>
        {uploadButton}
      </div>
    );
  }
}

export default FileUpload;
