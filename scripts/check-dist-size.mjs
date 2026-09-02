#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { brotliCompressSync } from 'node:zlib';

const bundlePath = path.resolve('dist/index.js');
const limitBytes = 200_000;

if (!fs.existsSync(bundlePath)) {
  console.error('[check-dist-size] dist/index.js does not exist. Run npm run build first.');
  process.exit(1);
}

// Size Limit reported Brotli-compressed bytes by default. Preserve that
// contract without installing its browser timing and archive-extraction stack.
const actualBytes = brotliCompressSync(fs.readFileSync(bundlePath)).length;
const actualKilobytes = (actualBytes / 1_000).toFixed(2);
const limitKilobytes = (limitBytes / 1_000).toFixed(0);

if (actualBytes > limitBytes) {
  console.error(
    `[check-dist-size] dist/index.js is ${actualKilobytes} kB Brotli; the limit is ${limitKilobytes} kB.`
  );
  process.exit(1);
}

console.log(
  `[check-dist-size] dist/index.js is ${actualKilobytes} kB Brotli / ${limitKilobytes} kB.`
);
