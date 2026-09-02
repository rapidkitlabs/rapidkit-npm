# RapidKit npm compatibility CLI

[![npm version](https://img.shields.io/npm/v/rapidkit.svg?style=flat-square)](https://www.npmjs.com/package/rapidkit)
[![Downloads](https://img.shields.io/npm/dm/rapidkit.svg?style=flat-square)](https://www.npmjs.com/package/rapidkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Organization: Chistiq](https://img.shields.io/badge/Organization-Chistiq-111111?style=flat-square)](https://github.com/chistiq)

> [!IMPORTANT]
> `rapidkit` is deprecated. Version `0.42.5` is its final security maintenance
> release. Existing users should migrate to
> [Workspai](https://www.npmjs.com/package/workspai); new projects and
> integrations must start there.

RapidKit helped establish the workspace-oriented CLI that now continues in
Workspai. This repository is maintained for compatibility, security fixes, and
safe migration—not as the starting point for new Workspace Intelligence work.

## Choose the right path

| If you are… | Use | Start here |
| --- | --- | --- |
| Creating a new workspace or integration | `workspai` | [Workspai CLI](https://github.com/chistiq/workspai) |
| Connecting an existing project for the first time | `workspai adopt` | [Adopt an existing project](#move-an-existing-project-to-workspai) |
| Maintaining a script that already calls `rapidkit` | `rapidkit` compatibility CLI | [Legacy command access](#legacy-command-access) |
| Migrating an existing RapidKit workspace | Workspai migration path | [Migration guide](docs/MIGRATING_TO_WORKSPAI.md) |

## Start new work with Workspai

You do not need to move an existing project or create a workspace by hand.
From the project directory:

```bash
cd /path/to/your-project
npx workspai adopt .
```

Workspai keeps the source in place and creates or reuses the managed minimal
workspace at:

```text
~/.workspai/workspaces/workspai
```

Continue from the workspace path printed by the CLI:

```bash
cd ~/.workspai/workspaces/workspai
npx workspai workspace intelligence run \
  --for-agent generic \
  --strict \
  --json
```

That chain builds the current workspace model and proof-backed graph, checks
health and contracts, assesses readiness, verifies the evidence, and prepares
bounded context for agent and IDE consumers.

- Workspai documentation: [workspai.dev](https://www.workspai.dev/)
- Product overview: [workspai.com](https://www.workspai.com/)
- Source: [chistiq/workspai](https://github.com/chistiq/workspai)

## Move an existing project to Workspai

The shortest safe migration is adoption in place:

```bash
cd /path/to/existing-project
npx workspai adopt .
```

The project stays where it is. Workspai writes canonical `.workspai` metadata
and registers the source with a managed workspace. Do not rename `.rapidkit`
directories to `.workspai` manually; the schemas, ownership, and artifact paths
are versioned contracts rather than interchangeable folder names.

For several related projects, create one named workspace and adopt each project
into that boundary:

```bash
npx workspai create workspace my-workspace --profile minimal --yes

cd /path/to/frontend
npx workspai adopt . \
  --workspace "$HOME/.workspai/workspaces/my-workspace"

cd /path/to/api
npx workspai adopt . \
  --workspace "$HOME/.workspai/workspaces/my-workspace"
```

See [Migrating from RapidKit npm to Workspai](docs/MIGRATING_TO_WORKSPAI.md)
for CI, workspace, project, and rollback guidance.

## Legacy command access

Existing installations and scripts can continue to inspect the compatibility
surface:

```bash
npx rapidkit --help
npx rapidkit --version
```

Common maintenance commands remain documented for current RapidKit users:

```bash
npx rapidkit doctor workspace
npx rapidkit setup <python|node|go|java|dotnet> [--warm-deps]
npx rapidkit workspace list
npx rapidkit cache <status|clear|prune|repair>
npx rapidkit mirror <status|sync|verify|rotate>
```

Do not use these examples as the foundation of a new integration. Their
canonical Workspai equivalents and newer `.workspai` artifacts live in the
[Workspai CLI repository](https://github.com/chistiq/workspai).

## Migration map

| Legacy RapidKit | Canonical Workspai |
| --- | --- |
| `npx rapidkit adopt .` | `npx workspai adopt .` |
| `npx rapidkit create workspace my-workspace` | `npx workspai create workspace my-workspace` |
| `npx rapidkit create project <kit> <name>` | `npx workspai create project <kit> <name>` |
| `npx rapidkit workspace model --json` | `npx workspai workspace model --write --json` |
| `npx rapidkit pipeline --json --strict` | `npx workspai pipeline --json --strict` |
| `.rapidkit/**` | `.workspai/**` generated through Workspai commands |
| `~/rapidkit/workspaces/**` | `~/.workspai/workspaces/**` for new managed workspaces |

Command names may look similar, but migration is not a directory rename. Run
Workspai so it can create and validate the canonical contracts.

## Deprecation and maintenance status

This repository and the `rapidkit` npm package were deprecated on September 1,
2026. No new features, compatibility releases, or user journeys are planned.
The repository remains available as a read-only migration and security-history
record.

All active development belongs in
[chistiq/workspai](https://github.com/chistiq/workspai). See the
[deprecation notice](DEPRECATION.md) and
[migration guide](docs/MIGRATING_TO_WORKSPAI.md) for the supported transition.

## Legacy documentation

The documentation in this repository describes the existing `rapidkit`
compatibility surface and `.rapidkit` artifacts. It is retained for users who
still operate that version:

- [Legacy documentation index](docs/README.md)
- [Legacy command reference](docs/commands-reference.md)
- [Workspace operations](docs/workspace-operations.md)
- [Runtime support matrix](docs/contracts/RUNTIME_SUPPORT_MATRIX.md)
- [Artifact catalog](docs/contracts/ARTIFACT_CATALOG.md)
- [Security policy](docs/SECURITY.md)

For current product documentation, use
[workspai.dev](https://www.workspai.dev/).

## Related repositories

- [chistiq/rapidkit-npm](https://github.com/chistiq/rapidkit-npm) — this legacy
  npm compatibility package
- [chistiq/rapidkit-core](https://github.com/chistiq/rapidkit-core) — RapidKit
  Core and historical engine integration
- [chistiq/rapidkit-vscode](https://github.com/chistiq/rapidkit-vscode) — the
  Workspai experience for VS Code
- [chistiq/workspai](https://github.com/chistiq/workspai) — canonical CLI and
  active Workspace Intelligence development

## Contributors and maintainers

This repository is still tested because migration software must remain safe.

```bash
corepack npm ci
corepack npm run build
corepack npm run validate
corepack npm run validate:docs
corepack npm run validate:contracts
```

The final CI definitions are retained as non-executable history under
`.github/archived-workflows/`. GitHub Actions are disabled for this deprecated
repository; local validation remains documented in
[docs/ci-workflows.md](docs/ci-workflows.md).

See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Feature work
that targets the canonical CLI should be opened against
[chistiq/workspai](https://github.com/chistiq/workspai).

## Security

Please report vulnerabilities through the process in
[docs/SECURITY.md](docs/SECURITY.md). Do not publish sensitive details in a
public issue.

## License

MIT — see [LICENSE](LICENSE).
