/**
 * mermaid.js theme configuration
 *
 * @see https://mermaid-js.github.io/mermaid/#/Setup?id=theme
 *
 * - default
 * - forest
 * - dark
 * - neutral
 * - null
 */
export const CE_MERMAID_THEME = {
  DARK: "dark",
  DEFAULT: "default",
  FOREST: "forest",
  NEUTRAL: "neutral",
  NULL: "null",
} as const;

export type CE_MERMAID_THEME = (typeof CE_MERMAID_THEME)[keyof typeof CE_MERMAID_THEME];
