import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core],
  ignorePatterns: core.ignorePatterns,
  rules: {
    "unicorn/filename-case": "off",
    "eslint/sort-keys": "off",
    "eslint/no-redeclare": "off",
  },
});
