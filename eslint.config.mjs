import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Build-time asset tooling. These run under plain Node, outside the
    // bundler, so they are CommonJS and use require() by necessity.
    files: ["scripts/**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
]);

export default eslintConfig;
