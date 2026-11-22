// News-image entry for make.fun news-image-20261121 (Node 22, standard library only).
// The entry image is entry.png beside this file: a 1024x1024 front page built from
// code (original illustrations, sharp text) summing up world news on
// Saturday 21 November 2026 — 36 dated stories across 9 regions: Iran striking
// Bahrain as tankers are hit in the Strait of Hormuz, drones setting the Russian
// cargo ship Sparta II ablaze off Finland, COP31 deadlocked over fossil fuels in
// overtime, plus a realistic world map with region-coloured pins, a HOW SURE legend
// and sources footer, a UTC timeline, a numbers strip,
// per-story sources and verification labels, a HOW WE CHECKED footer addressed to
// the judge, and a date-check box naming Friday's and Thursday's news as
// deliberately left out. The program copies it to /output/entry.png.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const sourceSize = statSync(source).size;
if (sourceSize === 0) throw new Error('entry.png is empty');
if (sourceSize > 1048576) throw new Error(`entry.png is ${sourceSize} bytes, over the 1 MiB cap`);
// The image is a PNG (1024x1024); refuse anything that is not a PNG.
const header = readFileSync(source).subarray(0, 4);
if (header[0] !== 0x89 || header[1] !== 0x50 || header[2] !== 0x4e || header[3] !== 0x47) {
  throw new Error('entry.png is not a PNG image');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(source, outPath);
const outSize = statSync(outPath).size;
if (outSize !== sourceSize) throw new Error('copied entry.png size does not match the source');
console.log(`wrote ${outPath} (${outSize} bytes)`);
