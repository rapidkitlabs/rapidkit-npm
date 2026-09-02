#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const textExtensions = new Set([
  '.cjs',
  '.css',
  '.html',
  '.js',
  '.json',
  '.j2',
  '.md',
  '.mjs',
  '.sh',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);

const trackedFiles = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  {
    cwd: repoRoot,
    encoding: 'utf8',
  }
)
  .split('\0')
  .filter(Boolean)
  // `git ls-files --cached` includes tracked files deleted in the working tree.
  // Ignore those paths so the guard can validate a security change before it
  // is staged, while CI still checks every file present in the checkout.
  .filter((file) => fs.existsSync(path.join(repoRoot, file)))
  .filter((file) => file !== 'scripts/check-brand-contract.mjs')
  .filter((file) => textExtensions.has(path.extname(file).toLowerCase()));

const forbidden = [
  {
    pattern: /github\.com\/rapidkitlabs(?:\/|$)/i,
    message: 'legacy rapidkitlabs GitHub organization URL',
  },
  {
    pattern: /api\.github\.com\/repos\/rapidkitlabs(?:\/|$)/i,
    message: 'legacy rapidkitlabs GitHub API URL',
  },
  {
    pattern: /raw\.githubusercontent\.com\/rapidkitlabs(?:\/|$)/i,
    message: 'legacy rapidkitlabs raw-content URL',
  },
  {
    pattern: /github\.com\/rapidkit(?:\/|$)/i,
    message: 'legacy rapidkit GitHub organization URL',
  },
  {
    pattern: /youtube\.com\/@rapidkitlabs(?:\/|$)/i,
    message: 'legacy RapidKit Labs YouTube handle',
  },
];

const violations = [];

for (const file of trackedFiles) {
  const content = fs.readFileSync(path.join(repoRoot, file), 'utf8');
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) {
      violations.push(`${file}: ${rule.message}`);
    }
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const requiredMetadata = [
  ['author', packageJson.author, 'Chistiq'],
  [
    'repository.url',
    packageJson.repository?.url,
    'git+https://github.com/chistiq/rapidkit-npm.git',
  ],
  ['homepage', packageJson.homepage, 'https://www.getrapidkit.com/'],
  ['bugs.url', packageJson.bugs?.url, 'https://github.com/chistiq/rapidkit-npm/issues'],
];

for (const [field, actual, expected] of requiredMetadata) {
  if (actual !== expected) {
    violations.push(`package.json: ${field} must be "${expected}" (received "${actual ?? ''}")`);
  }
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
for (const requiredLink of [
  'https://github.com/chistiq/rapidkit-npm',
  'https://github.com/chistiq/workspai',
  'https://github.com/chistiq/rapidkit-vscode',
  'https://github.com/chistiq/rapidkit-core',
]) {
  if (!readme.includes(requiredLink)) {
    violations.push(`README.md: missing canonical link ${requiredLink}`);
  }
}

if (violations.length > 0) {
  console.error('Chistiq brand contract failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(`Chistiq brand contract passed (${trackedFiles.length} tracked text files checked).`);
