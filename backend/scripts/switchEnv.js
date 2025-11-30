#!/usr/bin/env node

/**
 * Environment Switcher Script
 * 
 * Usage:
 *   node scripts/switchEnv.js development
 *   node scripts/switchEnv.js staging
 *   node scripts/switchEnv.js production
 */

const fs = require('fs');
const path = require('path');

const env = process.argv[2];
const validEnvs = ['development', 'staging', 'production'];

if (!env || !validEnvs.includes(env)) {
  console.error('❌ Invalid environment specified!');
  console.log('\nUsage: node scripts/switchEnv.js <environment>');
  console.log('\nValid environments:');
  validEnvs.forEach(e => console.log(`  - ${e}`));
  process.exit(1);
}

const sourceFile = path.join(__dirname, '..', `.env.${env}`);
const targetFile = path.join(__dirname, '..', '.env');

if (!fs.existsSync(sourceFile)) {
  console.error(`❌ Environment file not found: .env.${env}`);
  process.exit(1);
}

try {
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`✅ Switched to ${env.toUpperCase()} environment`);
  console.log(`📝 Active config: .env (copied from .env.${env})`);
  console.log('\n🚀 Restart your server to apply changes:');
  console.log(`   npm run dev  # or npm start`);
} catch (error) {
  console.error('❌ Error switching environment:', error.message);
  process.exit(1);
}
