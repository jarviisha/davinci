import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type TokenNode = {
  $type?: string;
  $value?: string | number;
  [key: string]: unknown;
};

type FlatToken = {
  path: string[];
  name: string;
  source: string;
  type: string;
  value: string;
};

type TokenDocument = {
  node: TokenNode;
  source: string;
};

type CliArgs = {
  in?: string;
  out?: string;
};

function parseArgs(argv: readonly string[]): CliArgs {
  const result: CliArgs = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--in" || arg === "--out") {
      const value = argv[i + 1];

      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`);
      }

      if (arg === "--in") {
        result.in = value;
      } else {
        result.out = value;
      }

      i++;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return result;
}

const args = parseArgs(process.argv.slice(2));
const builderDir = path.dirname(fileURLToPath(import.meta.url));
const defaultTokensRoot = path.resolve(builderDir, "../../tokens");
const sourceRoot = path.resolve(args.in ?? path.join(defaultTokensRoot, "src"));
const distRoot = path.resolve(args.out ?? path.join(defaultTokensRoot, "dist"));

const sourceFiles = {
  primitive: [
    "primitive/color.json",
    "primitive/spacing.json",
    "primitive/radius.json",
    "primitive/focus.json",
    "primitive/shadow.json",
    "primitive/typography.json"
  ],
  semanticLight: ["semantic/light.json"],
  semanticDark: ["semantic/dark.json"]
} as const;

async function readJson(relativePath: string): Promise<TokenNode> {
  const content = await readFile(path.join(sourceRoot, relativePath), "utf8");
  return JSON.parse(content) as TokenNode;
}

async function readDocument(relativePath: string): Promise<TokenDocument> {
  return {
    node: await readJson(relativePath),
    source: relativePath
  };
}

async function readMany(relativePaths: readonly string[]): Promise<TokenNode> {
  const files = await Promise.all(relativePaths.map(readDocument));
  return files.reduce<TokenNode>((merged, file) => deepMerge(merged, file.node), {});
}

function deepMerge(target: TokenNode, source: TokenNode): TokenNode {
  for (const [key, value] of Object.entries(source)) {
    if (isRecord(value) && isRecord(target[key]) && !("$value" in value)) {
      target[key] = deepMerge(target[key] as TokenNode, value as TokenNode);
    } else {
      target[key] = value;
    }
  }

  return target;
}

function flattenTokens(node: TokenNode, source: string, tokenPath: string[] = []): FlatToken[] {
  if ("$value" in node) {
    return [
      {
        path: tokenPath,
        name: tokenPathToVarName(tokenPath),
        source,
        type: String(node.$type ?? "unknown"),
        value: String(node.$value)
      }
    ];
  }

  return Object.entries(node).flatMap(([key, value]) => {
    if (!isRecord(value)) {
      return [];
    }

    return flattenTokens(value as TokenNode, source, [...tokenPath, key]);
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function tokenPathToVarName(tokenPath: string[]): string {
  return `--davinci-${tokenPath.map(toKebabCase).join("-")}`;
}

function toKebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function cssValue(token: FlatToken): string {
  return token.value.replace(/\{([^}]+)\}/g, (_, reference: string) => {
    return `var(${tokenPathToVarName(reference.split("."))})`;
  });
}

function renderCss(selector: string, tokens: FlatToken[]): string {
  const declarations = tokens.map((token) => `  ${token.name}: ${cssValue(token)};`).join("\n");
  return `${selector} {\n${declarations}\n}\n`;
}

type JsBucket = {
  exportName: string;
  tokens: FlatToken[];
};

function renderTokensJs(buckets: readonly JsBucket[]): string {
  return (
    buckets
      .map((bucket) => {
        const entries = bucket.tokens
          .map((token) => {
            const key = JSON.stringify(token.path.join("."));
            const type = JSON.stringify(token.type);
            const value = JSON.stringify(token.value);
            const cssVar = JSON.stringify(token.name);
            return `  ${key}: { type: ${type}, value: ${value}, cssVar: ${cssVar} }`;
          })
          .join(",\n");

        return `export const ${bucket.exportName} = {\n${entries}\n};`;
      })
      .join("\n\n") + "\n"
  );
}

function renderTokensDts(buckets: readonly JsBucket[]): string {
  const declarations = buckets
    .map((bucket) => {
      const entries = bucket.tokens
        .map((token) => {
          const key = JSON.stringify(token.path.join("."));
          const type = JSON.stringify(token.type);
          const value = JSON.stringify(token.value);
          const cssVar = JSON.stringify(token.name);
          return `  readonly ${key}: { readonly type: ${type}; readonly value: ${value}; readonly cssVar: ${cssVar} };`;
        })
        .join("\n");

      return `export declare const ${bucket.exportName}: {\n${entries}\n};`;
    })
    .join("\n\n");

  const typeAliases = [
    "export type TokenName = keyof typeof tokens;",
    "export type SemanticTokenName = keyof typeof lightTokens;"
  ].join("\n");

  return `${declarations}\n\n${typeAliases}\n`;
}

async function build(): Promise<void> {
  const componentFiles = await readComponentFiles();
  const primitive = await readMany(sourceFiles.primitive);
  const semanticLight = await readMany(sourceFiles.semanticLight);
  const semanticDark = await readMany(sourceFiles.semanticDark);
  const component = await readMany(componentFiles);
  const documents = await readAllDocuments(componentFiles);

  validateDocuments(documents);

  const primitiveTokens = flattenTokens(primitive, "primitive");
  const lightTokens = flattenTokens(semanticLight, "semantic/light");
  const darkTokens = flattenTokens(semanticDark, "semantic/dark");
  const componentTokens = flattenTokens(component, "component");
  const staticTokens = [...primitiveTokens, ...componentTokens];

  const jsBuckets: JsBucket[] = [
    { exportName: "tokens", tokens: staticTokens },
    { exportName: "lightTokens", tokens: lightTokens },
    { exportName: "darkTokens", tokens: darkTokens }
  ];

  validateOutputs(
    [
      { label: "variables.css", tokens: staticTokens },
      { label: "light.css", tokens: lightTokens },
      { label: "dark.css", tokens: darkTokens }
    ],
    jsBuckets
  );

  await rm(distRoot, { force: true, recursive: true });
  await mkdir(path.join(distRoot, "css"), { recursive: true });
  await mkdir(path.join(distRoot, "js"), { recursive: true });

  await writeFile(path.join(distRoot, "css/variables.css"), renderCss(":root", staticTokens));
  await writeFile(path.join(distRoot, "css/light.css"), renderCss(":root,\n.light", lightTokens));
  await writeFile(path.join(distRoot, "css/dark.css"), renderCss(".dark", darkTokens));
  await writeFile(path.join(distRoot, "js/tokens.js"), renderTokensJs(jsBuckets));
  await writeFile(path.join(distRoot, "js/tokens.d.ts"), renderTokensDts(jsBuckets));

  const total = jsBuckets.reduce((sum, bucket) => sum + bucket.tokens.length, 0);
  console.log(`Built ${total} tokens into ${path.relative(process.cwd(), distRoot) || distRoot}`);
}

await build();

async function readComponentFiles(): Promise<string[]> {
  const componentRoot = path.join(sourceRoot, "component");
  const files = await readdir(componentRoot);

  return files
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => `component/${file}`);
}

async function readAllDocuments(componentFiles: string[]): Promise<TokenDocument[]> {
  const files = [
    ...sourceFiles.primitive,
    ...sourceFiles.semanticLight,
    ...sourceFiles.semanticDark,
    ...componentFiles
  ];

  return Promise.all(files.map(readDocument));
}

function validateDocuments(documents: TokenDocument[]): void {
  const errors: string[] = [];
  const merged = documents.reduce<TokenNode>((result, document) => deepMerge(result, document.node), {});
  const availableReferences = new Set(flattenTokens(merged, "all").map((token) => token.path.join(".")));

  for (const document of documents) {
    validateNode(document.node, {
      availableReferences,
      errors,
      path: [],
      source: document.source
    });
  }

  if (errors.length > 0) {
    throw new Error(`Token validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
}

function validateNode(
  node: TokenNode,
  context: {
    availableReferences: Set<string>;
    errors: string[];
    path: string[];
    source: string;
  }
): void {
  if ("$value" in node) {
    const tokenName = context.path.join(".");

    if (!node.$type) {
      context.errors.push(`${context.source}:${tokenName} is missing "$type"`);
    }

    if (node.$value === undefined || node.$value === null || node.$value === "") {
      context.errors.push(`${context.source}:${tokenName} is missing "$value"`);
      return;
    }

    if (typeof node.$value === "string") {
      for (const reference of referencesIn(node.$value)) {
        if (!context.availableReferences.has(reference)) {
          context.errors.push(`${context.source}:${tokenName} references missing token "{${reference}}"`);
        }
      }
    }

    return;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) {
      continue;
    }

    if (!isRecord(value)) {
      context.errors.push(`${context.source}:${[...context.path, key].join(".")} must be a token object`);
      continue;
    }

    validateNode(value as TokenNode, {
      ...context,
      path: [...context.path, key]
    });
  }
}

function referencesIn(value: string): string[] {
  return [...value.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
}

function validateOutputs(
  cssBundles: ReadonlyArray<{ label: string; tokens: FlatToken[] }>,
  jsBuckets: readonly JsBucket[]
): void {
  const errors = [
    ...cssBundles.flatMap((bundle) =>
      findDuplicates(bundle.tokens, (token) => token.name, `${bundle.label} CSS variable`)
    ),
    ...jsBuckets.flatMap((bucket) =>
      findDuplicates(bucket.tokens, (token) => token.path.join("."), `JS export "${bucket.exportName}"`)
    )
  ];

  if (errors.length > 0) {
    throw new Error(`Token output validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
}

function findDuplicates(tokens: FlatToken[], keyFor: (token: FlatToken) => string, label: string): string[] {
  const seen = new Map<string, FlatToken>();
  const errors: string[] = [];

  for (const token of tokens) {
    const key = keyFor(token);
    const previous = seen.get(key);

    if (previous) {
      errors.push(
        `${label} "${key}" is duplicated by ${previous.source}:${previous.path.join(".")} and ${token.source}:${token.path.join(".")}`
      );
      continue;
    }

    seen.set(key, token);
  }

  return errors;
}
