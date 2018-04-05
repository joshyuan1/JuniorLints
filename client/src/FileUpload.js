// Initial code from GitHub
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import React, { Component } from 'react';
// import axios, { post } from 'axios';
var fs = require('fs');

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
    }
  };


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
