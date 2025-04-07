//server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const API_KEY = 'Nl71zZxFwQUpKeIhLRQRokAcI3Xl5zHo';

// Session management middleware
const activeSessions = new Map();

app.post('/query', async (req, res) => {
  const userQuery = req.body.query;
  const userId = 'user-1'; // Replace with actual user ID system in production

  try {
    // 1. Create or reuse session
    let sessionId = activeSessions.get(userId);
    
    if (!sessionId) {
      const sessionResponse = await axios.post(
        'https://api.on-demand.io/chat/v1/sessions',
        {
          
          externalUserId: userId
        },
        {
          headers: { apikey: API_KEY }
        }
      );

      sessionId = sessionResponse.data?.data?.id;
      if (!sessionId) throw new Error('Failed to create session');
      activeSessions.set(userId, sessionId);
    }

    // 2. Send query with personality constraints
    // 2. Send query with STRICTER personality constraints
const queryResponse = await axios.post(
    `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
    {
      endpointId: 'predefined-openai-gpt4o',
      query: `[SYSTEM] You are HeyBuddy-bot. Never mention being "an AI". Follow these rules:
              1. ALWAYS start with "🤖 HeyBuddy-bot:" 
              2. Use simple, friendly language
              3. Never break character
              [USER] ${userQuery}`,
      responseMode: 'sync'
    },
    {
      headers: { apikey: API_KEY }
    }
  );
  
  // 3. Force-format the response
  const rawAnswer = queryResponse.data?.data?.answer || '';
  let formattedAnswer = rawAnswer.replace(/^(ai|assistant):?\s*/i, '');
  formattedAnswer = `🤖 HeyBuddy-bot: ${formattedAnswer.trim()}`;

  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Clear invalid sessions
    if (error.response?.status === 404) {
      activeSessions.delete(userId);
    }

    res.status(400).json({
      answer: '🤖 HeyBuddy-bot: Apologies, I\'m having trouble responding right now. Please try again later.',
      error: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});