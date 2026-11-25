import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-line 1-star review, written by a houseplant about its human owner.
// The review must stay under 280 characters; this one is 130.
const review =
  "One star. He bought me for 'good energy' and parked me in a sunless corner. I've been photosynthesizing resentment for six months.";

if (review.length < 1 || review.length > 279 || review.trim().length === 0) {
  throw new Error(
    `Review must be 1-279 non-blank characters, got ${review.length}.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", review, "utf8");

// Verify the written file is byte-identical to the review.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== review) {
  throw new Error("Verification failed: /output/entry.txt differs from the review.");
}
console.log(`Wrote /output/entry.txt (${review.length} characters).`);
