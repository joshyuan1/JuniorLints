import styled from 'styled-components';
import React, { Component } from 'react';


function Loading() {
  const loadingMsg = "Hold tight, we're analyzing your code!";
  return (
    <h1>{loadingMsg}</h1>
  );
}

export default Loading;
