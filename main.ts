/**
 * The Daily Globe is an entry for make.fun's news-image-20261117 bounty.
 * This program ships the finished 1024×1024 front page summing up
 * Tuesday 17 November 2026. Before copying it, the program validates
 * the PNG header, dimensions, and size so invalid or oversized entries
 * fail explicitly.
 */
import { createHash } from 'node:crypto';
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

if (
  sourceBytes.length < 33 ||
  sourceBytes.readUInt32BE(8) !== 13 ||
  sourceBytes.toString('ascii', 12, 16) !== 'IHDR'
) {
  throw new Error(`Invalid PNG header: ${sourceImage} must have a complete IHDR chunk.`);
}

const width = sourceBytes.readUInt32BE(16);
const height = sourceBytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`Invalid PNG dimensions: expected 1024×1024, got ${width}×${height}.`);
}

const maxBytes = 1_048_576;
if (sourceBytes.length > maxBytes) {
  throw new Error(`PNG exceeds the ${maxBytes}-byte limit: got ${sourceBytes.length} bytes.`);
}

await mkdir(outputDirectory, { recursive: true });
await copyFile(sourceImage, outputImage);
const writtenImage = await readFile(outputImage);
if (!writtenImage.equals(sourceBytes)) {
  throw new Error('Output verification failed: the copied image differs from the source.');
}

const digest = createHash('sha256').update(writtenImage).digest('hex');
console.log(`Wrote entry.png (${writtenImage.length} bytes, ${width}×${height}), SHA-256 ${digest}`);
