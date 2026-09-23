"use client";

import { useMemo, useState } from "react";

import {
  TRUST_CENTRE_CATEGORIES,
  type TrustCentreCategory,
  type TrustCentreListing,
} from "@/lib/trust-centre/shared";

/**
 * TRUST CENTRE — DOCUMENT LIBRARY
 * ---------------------------------------------------------------------------
 * Search, filter and layout for the catalogue.
 *
 * THE DATA HERE IS METADATA ONLY
 * This receives `TrustCentreListing[]` — titles, categories, references — and
 * never a storage key or URL. Downloads go through
 * /api/trust-centre/download/<id>, which re-checks the session and signs a
 * short-lived link server-side. So this component cannot leak a document even
 * though it runs in the browser.
 *
 * NOTE THE IMPORT: labels and types come from `shared.ts`, never from
 * `catalogue.ts`. Importing the catalogue here would pull all 31 storage keys
 * into the client bundle — it did, before the two were split.
 *
 * FILTERING IS CLIENT-SIDE ON PURPOSE
 * The whole catalogue is ~41 rows and already authorised for this viewer, so
 * round-tripping each keystroke would add latency and server load for nothing.
 */

type ViewMode = "rows" | "cards";

export function DocumentLibrary({
  documents,
}: {
  documents: TrustCentreListing[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TrustCentreCategory | "All">("All");
  const [view, setView] = useState<ViewMode>("rows");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return documents.filter((doc) => {
      if (category !== "All" && doc.category !== category) return false;
      if (!needle) return true;

      // Reviewers search by the id on a questionnaire as often as by title.
      return (
        doc.title.toLowerCase().includes(needle) ||
        doc.id.toLowerCase().includes(needle) ||
        doc.reference.toLowerCase().includes(needle)
      );
    });
  }, [documents, query, category]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, ID or clause"
          aria-label="Search documents"
          className="h-10 min-w-[220px] flex-1 rounded-lg border-[1.5px] border-border-default bg-surface-raised px-3 text-sm text-text-primary outline-none focus:border-border-brand focus:ring-2 focus:ring-border-brand/30"
        />

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as TrustCentreCategory | "All")
          }
          aria-label="Filter by category"
          className="h-10 rounded-lg border-[1.5px] border-border-default bg-surface-raised px-2.5 text-sm text-text-primary outline-none"
        >
          <option value="All">All categories</option>
          {Object.entries(TRUST_CENTRE_CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>
              {key}. {label}
            </option>
          ))}
        </select>

        <div
          role="group"
          aria-label="Layout"
          className="flex gap-1 rounded-lg bg-surface-subtle p-1"
        >
          {(["rows", "cards"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              aria-pressed={view === mode}
              className={
                view === mode
                  ? "cursor-pointer rounded-md bg-surface-raised px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm"
                  : "cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary"
              }
            >
              {mode === "rows" ? "Rows" : "Cards"}
            </button>
          ))}
        </div>
      </div>

      {/* aria-live so filtering announces its result to a screen reader, which
          otherwise gets no feedback that the list changed. */}
      <p className="mb-4 text-xs text-text-tertiary" aria-live="polite">
        Showing {visible.length} of {documents.length} documents
      </p>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-border-subtle p-10 text-center text-sm text-text-secondary">
          No documents match your search and filters.
        </p>
      ) : view === "cards" ? (
        <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 p-0">
          {visible.map((doc) => (
            <li key={doc.id}>
              <DocumentCard doc={doc} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-none overflow-hidden rounded-xl border border-border-subtle p-0">
          {visible.map((doc) => (
            <li key={doc.id}>
              <DocumentRow doc={doc} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The download control.
 *
 * A PLAIN LINK, NOT A fetch()
 * The endpoint answers 302 to a signed Azure URL. Letting the browser follow
 * that natively means the download behaves like any other: it streams, shows
 * progress, survives navigation away, and resumes. A fetch would have to buffer
 * the whole file in memory first.
 *
 * `download` is deliberately absent — it has no effect cross-origin, and the
 * SAS carries a Content-Disposition that names the file correctly anyway.
 */
function DownloadLink({ doc }: { doc: TrustCentreListing }) {
  if (!doc.downloadable) {
    return (
      <span className="text-xs text-text-tertiary">Not yet available</span>
    );
  }

  return (
    <a
      href={`/api/trust-centre/download/${doc.id}`}
      className="text-xs font-semibold text-text-brand underline underline-offset-2 hover:text-text-brand"
    >
      Download
    </a>
  );
}

function StatusBadge({ doc }: { doc: TrustCentreListing }) {
  const available = doc.downloadable;

  return (
    <span
      className={
        available
          ? "rounded-md bg-status-success-subtle px-2 py-1 text-[11px] font-semibold text-status-success"
          : "rounded-md bg-status-warning-subtle px-2 py-1 text-[11px] font-semibold text-status-warning"
      }
    >
      {available ? "Available" : "In preparation"}
    </span>
  );
}

function DocumentRow({ doc }: { doc: TrustCentreListing }) {
  return (
    <div className="grid grid-cols-[70px_minmax(0,1fr)_auto] items-center gap-3 border-b border-border-subtle bg-surface-raised px-4 py-3 last:border-b-0 sm:grid-cols-[70px_minmax(0,1fr)_120px_110px_100px]">
      <span className="font-mono text-[11px] text-text-tertiary">{doc.id}</span>

      <span className="text-sm font-semibold text-text-primary">
        {doc.title}
      </span>

      <span className="hidden text-xs text-text-secondary sm:block">
        {doc.category}. {TRUST_CENTRE_CATEGORIES[doc.category]}
      </span>

      <span className="hidden sm:block">
        <StatusBadge doc={doc} />
      </span>

      <span className="text-right">
        <DownloadLink doc={doc} />
      </span>
    </div>
  );
}

function DocumentCard({ doc }: { doc: TrustCentreListing }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-border-subtle bg-surface-raised p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-text-tertiary">
          {doc.id}
        </span>
        <StatusBadge doc={doc} />
      </div>

      <h3 className="flex-1 font-display text-base font-bold text-text-primary">
        {doc.title}
      </h3>

      <p className="text-xs text-text-secondary">
        {doc.category}. {TRUST_CENTRE_CATEGORIES[doc.category]}
      </p>

      <div className="border-t border-border-subtle pt-3">
        <DownloadLink doc={doc} />
      </div>
    </div>
  );
}
