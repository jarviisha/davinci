import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const builderEntry = path.join(packageDir, "src/build.ts");
const sourceRoot = path.resolve(packageDir, "../tokens/src");

let outDir = "";
let variablesCss = "";
let lightCss = "";
let darkCss = "";
let tokensJs = "";
let tokensDts = "";

beforeAll(async () => {
  outDir = await mkdtemp(path.join(tmpdir(), "davinci-tokens-"));
  await execFileAsync("pnpm", ["exec", "tsx", builderEntry, "--in", sourceRoot, "--out", outDir], {
    cwd: packageDir
  });

  variablesCss = await readFile(path.join(outDir, "css/variables.css"), "utf8");
  lightCss = await readFile(path.join(outDir, "css/light.css"), "utf8");
  darkCss = await readFile(path.join(outDir, "css/dark.css"), "utf8");
  tokensJs = await readFile(path.join(outDir, "js/tokens.js"), "utf8");
  tokensDts = await readFile(path.join(outDir, "js/tokens.d.ts"), "utf8");
}, 30_000);

afterAll(async () => {
  if (outDir) {
    await rm(outDir, { force: true, recursive: true });
  }
});

describe("token-builder output", () => {
  it("emits primitive variables on :root", () => {
    expect(variablesCss).toMatch(/^:root \{/);
    expect(variablesCss).toContain("--davinci-color-blue-500:");
    expect(variablesCss).toContain("--davinci-spacing-200:");
  });

  it("emits semantic light tokens on :root,.light", () => {
    expect(lightCss).toMatch(/^:root,\s*\.light \{/);
    expect(lightCss).toContain("--davinci-semantic-color-primary:");
  });

  it("emits semantic dark tokens on .dark", () => {
    expect(darkCss).toMatch(/^\.dark \{/);
    expect(darkCss).toContain("--davinci-semantic-color-primary:");
  });

  it("resolves {references} into var(--…) form", () => {
    expect(lightCss).toMatch(/--davinci-semantic-color-primary: var\(--davinci-color-blue-\d+\);/);
  });

  it("renames the negative dark-neutral key to a non-numeric token", () => {
    expect(variablesCss).toContain("--davinci-color-dark-neutral-deepest:");
    expect(variablesCss).not.toMatch(/--davinci-color-dark-neutral--\d/);
  });

  it("emits three split JS exports (tokens, lightTokens, darkTokens)", () => {
    expect(tokensJs).toMatch(/export const tokens = \{/);
    expect(tokensJs).toMatch(/export const lightTokens = \{/);
    expect(tokensJs).toMatch(/export const darkTokens = \{/);
    expect(tokensJs).toContain('"color.blue.500":');
    expect(tokensJs).toContain('"semantic.color.primary":');
  });

  it("emits matching declarations and type aliases in .d.ts", () => {
    expect(tokensDts).toMatch(/export declare const tokens:/);
    expect(tokensDts).toMatch(/export declare const lightTokens:/);
    expect(tokensDts).toMatch(/export declare const darkTokens:/);
    expect(tokensDts).toContain("export type TokenName = keyof typeof tokens;");
    expect(tokensDts).toContain("export type SemanticTokenName = keyof typeof lightTokens;");
  });

  it("does not duplicate keys within a single JS export bucket", () => {
    const buckets = tokensJs.split(/export const \w+ = \{/).slice(1);
    expect(buckets.length).toBeGreaterThanOrEqual(3);

    for (const bucket of buckets) {
      const body = bucket.split("};")[0];
      const keys = [...body.matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1]);
      const duplicates = keys.filter((key, idx) => keys.indexOf(key) !== idx);
      expect(duplicates).toEqual([]);
    }
  });
});
