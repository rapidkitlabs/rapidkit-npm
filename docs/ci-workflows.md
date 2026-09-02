# Archived CI workflows

GitHub Actions are disabled because this repository and npm package are
deprecated. No YAML workflow remains under `.github/workflows/`, so pushes,
pull requests, schedules, and manual dispatches cannot start repository jobs.

The final definitions are retained only as historical evidence:

| Workflow                 | Path                                             | Purpose                                                                   |
| ------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------- |
| Build / test matrix      | `.github/archived-workflows/ci.yml`                       | Final build, lint, typecheck, tests, coverage, contract gates                   |
| Workspace E2E matrix     | `.github/archived-workflows/workspace-e2e-matrix.yml`     | Final cross-OS workspace lifecycle smoke                                        |
| Windows bridge E2E       | `.github/archived-workflows/windows-bridge-e2e.yml`       | Final native Windows bridge and lifecycle checks                                |
| E2E smoke                | `.github/archived-workflows/e2e-smoke.yml`                | Final focused bridge regression smoke                                           |
| Frontend generator smoke | `.github/archived-workflows/frontend-generator-smoke.yml` | Final official frontend generator drift gate                                    |
| Security                 | `.github/archived-workflows/security.yml`                 | Final security scanning and policy checks                                       |

## Consumer workspace: agent grounding CI

For RapidKit **consumer workspaces** (not this CLI repo), use the copy-paste template:

- [examples/ci-agent-grounding.yml](./examples/ci-agent-grounding.yml)

Minimal job:

```yaml
- run: npx rapidkit pipeline --json --strict
- run: npx rapidkit workspace agent-sync --write --refresh-context --strict --json --preset enterprise
- run: node ./node_modules/rapidkit/scripts/check-agent-customization-drift.mjs --workspace .
```

`pipeline` writes governance evidence and **auto-syncs** agent grounding (`AGENTS.md`, Copilot, Cursor, Claude) unless `RAPIDKIT_NO_AGENT_SYNC=1` or `--no-agent-sync`.
Run the drift check after `agent-sync --write` so CI fails when generated agent customization files are stale.

## Local validation scripts

| Script                        | Command                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- |
| Runtime acceptance (default)  | `npm run test:runtime-matrix`                                             |
| Runtime acceptance (full)     | `npm run test:runtime-matrix:full`                                        |
| Frontend generators (dry-run) | `npm run smoke:frontend-generators`                                       |
| Frontend generators (network) | `npm run smoke:frontend-generators:network`                               |
| Docs drift guard              | `npm run check:docs-drift`                                                |
| README command smoke          | `npm run smoke:readme`                                                    |
| Agent customization drift     | `npm run check:agent-customization-drift -- --workspace <workspace-root>` |

## Final-release validation record

```bash
npm run validate
npm run validate:docs
npm run security
npm run test:runtime-matrix:full
```

## See also

- [SETUP.md](./SETUP.md)
- [DEVELOPMENT.md](./DEVELOPMENT.md)
- [Documentation index](./README.md)
