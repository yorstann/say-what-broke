import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Say What Actually Broke" bounty.
// The program writes a single line of software error copy to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): an error message
// that tells the brutal truth — the server is down, not
// "experiencing difficulties" — and lands on the truest fact in
// incident response: the only person with the password is asleep
// in another timezone. Pass 2 note: a runner-up confessed to
// losing the user's uploaded file; this one won because it mocks
// the industry's favourite euphemism by name before confessing.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ERROR_BEATS = [
  "Error 500: our server is down. Not 'experiencing difficulties' — down.",
  "It fell over, and the only person with the password is asleep in another timezone.",
] as const;

export function buildEntryLine(): string {
  return ERROR_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
