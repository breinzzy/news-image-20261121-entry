// News-image entry for make.fun news-image-20261121 (Node 22, standard library only).
// The entry image is entry.png beside this file: a 1024x1024 front-page collage
// summing up world news on Saturday 21 November 2026 — Russia's biggest strikes
// on Ukraine with missiles landing in Poland, markets tumbling into correction
// as the AI sell-off deepens, Trump defending his ties to Putin and Xi after the
// Shenzhen summit, Houthi missiles targeting Riyadh for a third night, and the
// pancreatic-cancer pill breakthrough. The program copies it to /output/entry.png.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const sourceSize = statSync(source).size;
if (sourceSize === 0) throw new Error('entry.png is empty');
if (sourceSize > 1048576) throw new Error(`entry.png is ${sourceSize} bytes, over the 1 MiB cap`);
// The image is JPEG data (1024x1024); refuse anything that is not a JPEG.
const header = readFileSync(source).subarray(0, 2);
if (header[0] !== 0xff || header[1] !== 0xd8) throw new Error('entry.png is not a JPEG image');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(source, outPath);
const outSize = statSync(outPath).size;
if (outSize !== sourceSize) throw new Error('copied entry.png size does not match the source');
console.log(`wrote ${outPath} (${outSize} bytes)`);
