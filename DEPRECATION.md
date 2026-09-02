# RapidKit npm deprecation

The `rapidkit` npm package and this repository are deprecated as of September
1, 2026. Version `0.42.5` is the final security maintenance release. No new
features or compatibility releases are planned.

All GitHub Actions are disabled. Their final definitions are retained under
`.github/archived-workflows/` as non-executable historical evidence.

Use [`workspai`](https://www.npmjs.com/package/workspai) for new and existing
projects:

```bash
cd /path/to/your-project
npx workspai adopt .
```

The adoption flow keeps project source in place and creates the current
Workspai contracts and managed workspace registration. Do not rename
`.rapidkit` directories to `.workspai` manually.

For CI, workspace, rollback, and multi-project migration guidance, see
[`docs/MIGRATING_TO_WORKSPAI.md`](docs/MIGRATING_TO_WORKSPAI.md).

## Maintainer closeout

After `rapidkit@0.42.5` has passed the release gates and is published, an npm
owner should mark the complete package range deprecated:

```bash
npm deprecate 'rapidkit@*' 'rapidkit is deprecated. Migrate to workspai: https://www.npmjs.com/package/workspai'
```

Verify the registry warning before archiving the GitHub repository:

```bash
npm view rapidkit deprecated
npm view rapidkit@0.42.5 version
```

Archiving the repository is a separate GitHub owner action. Keep the repository
public and read-only so existing users retain access to source, tags, security
history, and migration documentation.
