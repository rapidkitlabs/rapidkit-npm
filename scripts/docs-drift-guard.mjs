import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

const requiredSnippets = [
  '`rapidkit` is deprecated',
  'Version `0.42.5` is its final security maintenance',
  'DEPRECATION.md',
  'npx workspai adopt .',
  'npx workspai workspace intelligence run',
  'docs/MIGRATING_TO_WORKSPAI.md',
  'https://github.com/chistiq/workspai',
  'https://www.workspai.dev/',
  'npx rapidkit --help',
  'rapidkit doctor workspace',
  'rapidkit setup <python|node|go|java|dotnet> [--warm-deps]',
  'rapidkit workspace list',
  'rapidkit cache <status|clear|prune|repair>',
  'rapidkit mirror <status|sync|verify|rotate>',
  'docs/ci-workflows.md',
];

const errors = [];
for (const snippet of requiredSnippets) {
  if (!readme.includes(snippet)) {
    errors.push(`README missing required snippet: ${snippet}`);
  }
}

const forbiddenSnippets = [
  'Recommended for new projects:\n\n```bash\nnpm install -g rapidkit',
  'New workspaces go under `~/rapidkit/workspaces/<name>`',
];
for (const snippet of forbiddenSnippets) {
  if (readme.includes(snippet)) {
    errors.push(`README contains legacy-first onboarding: ${snippet.split('\n')[0]}`);
  }
}

const workflowRefs = [
  'ci.yml',
  'workspace-e2e-matrix.yml',
  'windows-bridge-e2e.yml',
  'e2e-smoke.yml',
  'security.yml',
];
for (const wf of workflowRefs) {
  const wfPath = path.join(root, '.github', 'archived-workflows', wf);
  if (!fs.existsSync(wfPath)) {
    errors.push(`Archived workflow missing: .github/archived-workflows/${wf}`);
  }
}

const activeWorkflowDir = path.join(root, '.github', 'workflows');
const activeWorkflows = fs
  .readdirSync(activeWorkflowDir)
  .filter((entry) => /\.ya?ml$/i.test(entry));
if (activeWorkflows.length > 0) {
  errors.push(`Deprecated repository has active GitHub workflows: ${activeWorkflows.join(', ')}`);
}

if (errors.length) {
  console.error('❌ Docs drift guard failed:\n');
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log('✅ Docs drift guard passed.');
