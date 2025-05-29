import * as dotenv from 'dotenv';

dotenv.config();

function getEnvVar(key: string, optional = false): string | undefined {
  const value = process.env[key];
  if (!value && !optional) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || '';
}

// Bot config
export const botConfig = {
  botToken: getEnvVar('TELEGRAM_BOT_TOKEN'),
  frontendUrl: getEnvVar('FRONTEND_URL', true),
  webhookUrl: getEnvVar('WEBHOOK_URL'),
};
