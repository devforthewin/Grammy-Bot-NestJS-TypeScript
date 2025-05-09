import * as dotenv from 'dotenv';

dotenv.config();

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

// Bot config
export const botConfig = {
  botToken: getEnvVar('BOT_TOKEN'),
  frontendUrl: getEnvVar('FRONTEND_URL'),
  webhookUrl: getEnvVar('WEBHOOK_URL'),
};
