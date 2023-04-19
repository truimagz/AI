const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const { encode } = require('gpt-3-encoder');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true, limit: '10mb' }));
app.use(bodyParser.raw());
app.listen(3001, () => console.log('Listening on port 3001'));

const max_tokens = 8170;

app.post('/createChatCompletion', async (req, res) => {
  const { apiKey, model, temperature, top_p, n, messages } = req.body;

  try {
    const response = await new OpenAIApi(new Configuration({ apiKey })).createChatCompletion({
      model, temperature, top_p, n, messages,
      max_tokens: max_tokens - encode(JSON.stringify(messages)).length
    });

    res.status(200).json({ data: response.data.choices[0].message.content });
  } catch (e) {
    res.status(200).json({ error: e });
  }
});