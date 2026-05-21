const fs = require('node:fs');
const path = require('node:path');

const requiredEnvVars = [
  'IDAM_API_TEST_USERNAME',
  'IDAM_API_TEST_PASSWORD',
  'IDAM_API_TEST_CLIENT_SECRET',
  'OIDC_INTEGRATION_TEST_USERNAME',
];

const loadDotEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#') || !line.includes('=')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadDotEnv();

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required test environment variables: ${missingEnvVars.join(', ')}. ` +
      'Provide them via CI Key Vault mapping or local .env.'
  );
}

