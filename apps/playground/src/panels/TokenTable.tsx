import { copyText, typographyStyle, type TokenEntry } from "../lib/tokens";

export function TokenTable({ title, tokens }: { title: string; tokens: TokenEntry[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-semibold" style={typographyStyle("heading-sm")}>
        {title}
      </h3>
      <div className="overflow-hidden rounded-lg border border-border bg-surface-raised">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border px-4 py-3 text-xs font-semibold uppercase text-text-muted">
          <span>Name</span>
          <span>Value</span>
          <span>CSS variable</span>
        </div>
        {tokens.map((token) => (
          <button
            className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-border px-4 py-3 text-left text-sm last:border-b-0"
            key={token.name}
            onClick={() => void copyText(token.cssVar)}
            type="button"
          >
            <span className="truncate font-medium">{token.name}</span>
            <span className="truncate text-text-subtle">{token.value}</span>
            <span className="truncate text-text-subtle">{token.cssVar}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
