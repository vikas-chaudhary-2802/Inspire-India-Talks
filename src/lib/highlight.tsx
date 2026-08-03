import React from "react";

/**
 * Automatically highlights the "important" keywords in a piece of text:
 *   • money figures            ₹13 lakh crore, Rs 4 crore, $40B, $965 billion
 *   • plain big numbers+units  527 million, 207,000-plus, 60-satellite
 *   • percentages              43%, 10 per cent
 *   • years                    2026
 *
 * Returns an array of React nodes so the matches can be wrapped in a styled
 * <mark>. Nothing about the source data needs to change — drop any string
 * through this and the keywords light up on their own.
 */

// Order matters: the money pattern (with a leading symbol) is tried before the
// bare number+unit pattern so "₹13 lakh crore" is captured as one unit.
const UNIT = "(?:lakh\\s?crore|lakh|crore|billion|million|trillion|bn|mn|cr|k|b|m)";
const NUM = "\\d[\\d,.]*(?:[–—-]\\d[\\d,.]*)?"; // supports ranges: 12–13, 35,000
const PATTERNS: RegExp[] = [
  // ₹ / Rs / $ amounts, optionally followed by a scale word
  new RegExp(`(?:₹|\\$|Rs\\.?)\\s?${NUM}(?:\\s?${UNIT})?`, "i"),
  // percentages: 43%  or  10 per cent / 10 percent
  /\d[\d,.]*\s?(?:%|per\s?cent|percent)/i,
  // bare numbers immediately followed by a scale word: 527 million, 4 crore
  // (?![A-Za-z]) stops single-letter units like "m" from matching the start of
  // a following word, e.g. "POEM-4 module" or "PSLV-C60 mission".
  new RegExp(`${NUM}(?:-?plus)?\\s?${UNIT}(?![A-Za-z])`, "i"),
  // hyphenated quantities like 60-satellite, 207,000-plus
  /\d[\d,.]*-(?:plus|satellite|year|month|week|day|seat|store|city|cities)/i,
  // standalone years 1800-2099
  /\b(?:18|19|20)\d{2}\b/,
  // markdown bold syntax for explicit keyword highlighting
  /\*\*[^*]+\*\*/,
];

const COMBINED = new RegExp(`(${PATTERNS.map((p) => p.source).join("|")})`, "gi");

export function highlightKeywords(text: string): React.ReactNode[] {
  if (!text) return [text];
  const parts = text.split(COMBINED);
  return parts.map((part, i) => {
    if (!part) return null;
    // split() with one capture group puts the matches at the odd indices.
    if (i % 2 === 1) {
      // Explicit **bold** markers.
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Auto-detected keywords (numbers, money, %, years) — render bold like the
      // Business Legacy style, not as an orange highlight box.
      return (
        <strong key={i} className="font-bold text-foreground">
          {part}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
