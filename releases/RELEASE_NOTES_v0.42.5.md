# RapidKit npm v0.42.5

Released September 1, 2026.

## Final security maintenance release

RapidKit npm 0.42.5 removes the final known high-severity development
dependency advisory and formally closes the legacy compatibility package in
favor of Workspai.

## Security

The previous bundle-size preset installed a Chrome timing stack even though
RapidKit only checked the byte size of `dist/index.js`. That unused chain
included Estimo, Puppeteer, `@puppeteer/browsers`, and `extract-zip` 2.0.1.
Because the affected `extract-zip` release has no patched successor, this
release removes the complete chain instead of suppressing or overriding the
advisory.

A dependency-free Node Brotli guard now enforces the same 200 kB compressed
bundle limit.

## Deprecation

- The `rapidkit` npm package is deprecated.
- This repository is ready to be archived after the npm deprecation is
  verified.
- No releases are planned after 0.42.5.
- All GitHub Actions are disabled and their final definitions are retained only
  under `.github/archived-workflows/`.
- Active CLI development continues in
  [chistiq/workspai](https://github.com/chistiq/workspai).

Existing projects can migrate without moving their source:

```bash
cd /path/to/your-project
npx workspai adopt .
```

See [the deprecation notice](../DEPRECATION.md) and
[migration guide](../docs/MIGRATING_TO_WORKSPAI.md).

## Verification

```bash
npm audit --audit-level=high
npm run size-check
npm run validate
```

Publication status: prepared for final release.
