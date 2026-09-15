const express = require('express');
const cors = require('cors');
const path = require('path');
const PromptArchitectEngine = require('./engine');

const app = express();
const port = process.env.PORT || 3000;
const engine = new PromptArchitectEngine();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to deconstruct & architect prompt
app.post('/api/architect', (req, res) => {
  try {
    const { input, overrides } = req.body;
    if (!input || typeof input !== 'string' || input.trim() === '') {
      return res.status(400).json({ error: 'A valid concept or prompt input is required.' });
    }

    const architecture = engine.deconstruct(input, overrides || {});
    const formattedMarkdown = engine.formatResponse(architecture);

    return res.json({
      success: true,
      architecture,
      formattedMarkdown
    });
  } catch (err) {
    console.error('Error processing prompt architecture:', err);
    return res.status(500).json({ error: err.message || 'Internal processing error' });
  }
});

// API endpoint for preset archetypes & guidance
app.get('/api/archetypes', (req, res) => {
  return res.json({
    archetypes: engine.archetypes,
    persona: {
      name: engine.name,
      tone: engine.persona
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🏛️ Prompt Architect Bot server running on http://0.0.0.0:${port}`);
});
