/**
 * TRUST CENTRE — CLIENT-SAFE TYPES AND LABELS
 * ---------------------------------------------------------------------------
 * The part of the catalogue vocabulary that is safe to ship to the browser:
 * category labels and the shape of a listing. No document data, no storage
 * keys.
 *
 * WHY THIS IS A SEPARATE FILE FROM catalogue.ts
 * Module imports are all-or-nothing to a bundler. `DocumentLibrary` is a
 * Client Component and needs the category labels; when those lived in
 * catalogue.ts, importing them pulled the WHOLE module — including every
 * `blobName` — into the client bundle. Stripping the keys at runtime in
 * `trustCentreListing()` did not help, because the bundler had already
 * inlined the source data.
 *
 * That was verified, not assumed: the built chunk contained all 29 storage
 * keys. Splitting the shared vocabulary out is what actually keeps them
 * server-side, and it is why catalogue.ts must never be imported by a
 * component marked "use client".
 */

export type TrustCentreCategory = "A" | "B" | "C" | "D" | "E" | "F";

export const TRUST_CENTRE_CATEGORIES: Record<TrustCentreCategory, string> = {
  A: "Business continuity and recovery",
  B: "Information security and governance",
  C: "Privacy and data protection",
  D: "People, compliance and suppliers",
  E: "Architecture and customer-facing legal",
  F: "Reference and archive",
};

/**
 * What the browser receives per document: everything needed to list, search
 * and request it — and nothing that says where it is stored.
 */
export interface TrustCentreListing {
  id: string;
  title: string;
  category: TrustCentreCategory;
  status: "uploaded" | "prepared";
  reference: string;
  downloadable: boolean;
}
