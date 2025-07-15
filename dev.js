// dev.js
const { exec } = require('child_process');

const frontend = exec('npm run dev', { cwd: './frontend' });
const backend = exec('npm run start:dev', { cwd: './backend' });

frontend.stdout.on('data', data => process.stdout.write(`[frontend] ${data}`));
frontend.stderr.on('data', data => process.stderr.write(`[frontend] ${data}`));

backend.stdout.on('data', data => process.stdout.write(`[backend] ${data}`));
backend.stderr.on('data', data => process.stderr.write(`[backend] ${data}`));
