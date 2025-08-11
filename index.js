import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const endpoint = "https://arnav-me4jq5o7-eastus2.cognitiveservices.azure.com/openai/deployments/gpt-5-mini/chat/completions?api-version=2024-02-15-preview";
  
  const body = {
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userMessage }
    ]
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.AZURE_OPENAI_KEY
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  res.json({ reply: data.choices?.[0]?.message?.content ?? "No response" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));