import React, { useState, useEffect } from "react";
import { CopyBlock, codepen } from "react-code-blocks";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import GPT3Tokenizer from "gpt3-tokenizer";

import {  } from "./utils.js";
import config from "./config.json";
import "./App.css";

const isDev = true;

function App() {
  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
  const {

  } = config;

  async function createChatCompletion(body) {
    let response;
    let result;

    if (isDev) {
      response = await fetch('/createChatCompletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      result = await response.json();
    } else {
      response = await window.api.invoke('createCompletion', {
        body
      });

      result = response;
    }
    
    return response;
  };

  return (
    <></>
  );
}

export default App;
