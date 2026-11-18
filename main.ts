/**
 * Copies the finished newspaper image summarizing the world news of
 * Tuesday 17 November 2026 to the make.fun output directory, then reads
 * the written image back and prints its byte length. Uses Node 22's
 * standard library only and makes no network requests.
 */
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(sourceDirectory, 'entry.png');
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputImage = join(outputDirectory, 'entry.png');

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const sourceBytes = await readFile(sourceImage);
if (!sourceBytes.subarray(0, pngSignature.length).equals(pngSignature)) {
  throw new Error(`Invalid PNG signature: source image ${sourceImage} must start with the 8-byte PNG signature.`);
}

await mkdir(outputDirectory, { recursive: true });
await copyFile(sourceImage, outputImage);
const writtenImage = await readFile(outputImage);
console.log(`Wrote entry.png: ${writtenImage.length} bytes`);
