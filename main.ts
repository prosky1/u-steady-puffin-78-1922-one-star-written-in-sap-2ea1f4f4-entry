import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Star, Written in Sap — a houseplant's one-line 1-star review of
// its human owner. Gate from RULES.txt: 1–279 characters. This text is
// 101 characters.
const review =
  "One star. Sold as 'low maintenance.' He hasn't repotted me in two years. The pot is now a suggestion.";

// Guard: the review must be a non-blank string inside the 1–279 range.
if (review.trim().length === 0 || review.length < 1 || review.length > 279) {
  throw new Error(
    `Review must be 1-279 non-blank characters, got ${review.length}.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", review, "utf8");

// Read the file back and confirm it matches the review byte for byte,
// comparing raw bytes (not just decoded strings) and rejecting any
// trailing newline the writer might have added.
const writtenBytes = readFileSync("/output/entry.txt");
const reviewBytes = Buffer.from(review, "utf8");
if (!writtenBytes.equals(reviewBytes)) {
  throw new Error(
    "Verification failed: /output/entry.txt differs from the review.",
  );
}
const written = writtenBytes.toString("utf8");
if (written !== review) {
  throw new Error(
    "Verification failed: /output/entry.txt differs from the review.",
  );
}

console.log(`Wrote /output/entry.txt (${review.length} characters).`);
