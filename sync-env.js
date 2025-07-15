// sync-env.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
const env = dotenv.parse(fs.readFileSync(envPath));

// backend/.env
const backendEnv = `PORT=${env.BACKEND_PORT}
FRONTEND_URL=${env.FRONTEND_URL}
`;

fs.writeFileSync(path.resolve(__dirname, 'backend/.env'), backendEnv);

// frontend/.env.local
const frontendEnv = `PORT=${env.FRONTEND_PORT}
NEXT_PUBLIC_BACKEND_URL=${env.BACKEND_URL}
`;

fs.writeFileSync(path.resolve(__dirname, 'frontend/.env.local'), frontendEnv);

console.log('✅ Arquivos .env sincronizados com sucesso!');
