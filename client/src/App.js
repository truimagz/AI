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


  // -- OpenAI API
  async function createChatCompletion(body) {
    let response;
    let result;

    console.log(':::body', body);

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

    console.log(':::result', result);
    
    return response;
  };

  /* -- Call the API -- */
  createChatCompletion({
    apiKey: '',
    model: 'gpt-4', /* gpt-3.5-turbo */
    temperature: 1, 
    top_p: 1, 
    n: 3, 
    messages: [
      { role: 'system', content: 'You are an AI language model' },
      { role: 'user', content: 'I am a real Human' },
      { role: 'assistant', content: 'I am an AI language model' },
      { role: 'user', content: 'Hello World!' }
    ]
  });

  return (
    <></>
  );
}

export default App;
