#!/usr/bin/env node

/**
 * Prompt Architect Bot - Command Line Interface
 * Professional, direct, technical, and precise prompt reverse engineering.
 */

const readline = require('readline');
const PromptArchitectEngine = require('./engine');

const engine = new PromptArchitectEngine();

console.log(`=============================================================`);
console.log(`🏛️  PROMPT ARCHITECT BOT — Reverse Prompt Engineering CLI`);
console.log(`Persona: Professional, technical, direct, and architectural`);
console.log(`Type 'exit' or press Ctrl+C to quit.`);
console.log(`=============================================================\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'PromptArchitect> '
});

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
    console.log('Terminating Prompt Architect Bot.');
    process.exit(0);
  }

  if (!input) {
    rl.prompt();
    return;
  }

  try {
    const architecture = engine.deconstruct(input);
    const formatted = engine.formatResponse(architecture);
    console.log('\n' + formatted + '\n');
  } catch (err) {
    console.error(`\n[ERROR]: ${err.message}\n`);
  }

  rl.prompt();
}).on('close', () => {
  console.log('\nPrompt Architect Bot offline.');
  process.exit(0);
});
