# RapidKit v0.42.4

Released: August 9, 2026

## Dependency Security Maintenance

This patch keeps the legacy `rapidkit` npm compatibility CLI available while
removing current vulnerabilities from its development and packaging toolchain.
Runtime command behavior is unchanged.

## Security

- Updated `brace-expansion` from `5.0.8` to `5.0.9`.
- Updated `fast-uri` from `3.1.4` to `3.1.5`.
- Updated `ip-address` from `10.2.0` to `10.4.0`.
- Updated `js-yaml` from `4.3.0` to `4.3.1`.
- Updated Nano ID from `5.1.5`/`5.1.6` to `5.1.16` for Estimo and Size Limit
  Webpack.
- Updated PostCSS's compatible Nano ID branch from `3.3.16` to `3.3.18`.

The overrides stay inside the dependency majors selected by their consumers.
Size Limit remains on v12; this release does not use npm's suggested breaking
downgrade to v11 and does not run `npm audit fix --force`.

## Commit Safety

- Pre-commit contract checks are scoped to related staged changes, so unrelated
  local contract work does not block a focused compatibility/security commit.
- Pre-commit no longer regenerates contracts or stages changes in this or a
  sibling repository. Developers must run contract sync explicitly and review
  the resulting diff.
- CI and release quality gates continue to enforce complete contract parity.

## Breaking Changes

None.

## Verification

- `npm audit --audit-level=moderate`
- `npm run validate`
- `npm run build`
- `npm run size-check`
- 164 test files and 1,652 tests passed; 8 tests were explicitly skipped.
- Type checking, linting, formatting, and the Chistiq brand contract passed.
- Bundle size remained 68.68 kB against the 200 kB limit.

## Upgrade

Existing compatibility users:

```bash
npm install -g rapidkit@0.42.4
```

New projects:

```bash
npm install -g workspai
```

Migration guide:
[docs/MIGRATING_TO_WORKSPAI.md](../docs/MIGRATING_TO_WORKSPAI.md)
