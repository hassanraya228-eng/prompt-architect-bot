/**
 * Forever Daemon Supervisor for Prompt Architect Telegram Bot
 * Runs child process and restarts immediately upon any error or termination.
 */

const { spawn } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'telegram-bot.js');

function startChild() {
  console.log(`[Supervisor] Starting Telegram Bot: ${scriptPath}`);
  
  const child = spawn(process.execPath, [scriptPath], {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', (err) => {
    console.error('[Supervisor] Process error:', err);
  });

  child.on('exit', (code, signal) => {
    console.warn(`[Supervisor] Bot exited with code ${code} (signal: ${signal}). Auto-restarting in 1s...`);
    setTimeout(startChild, 1000);
  });
}

startChild();
