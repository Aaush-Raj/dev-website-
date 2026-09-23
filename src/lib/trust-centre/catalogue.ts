/**
 * TRUST CENTRE — DOCUMENT CATALOGUE
 * ---------------------------------------------------------------------------
 * The list of documents the portal offers, transcribed from the approved
 * Trust Centre catalogue (TC-001 ... TC-042).
 *
 * METADATA ONLY — NO CONTENT, NO URLS
 * Every entry describes a document; none contains its bytes or a link to
 * them. The actual file lives in a PRIVATE Azure Blob container and is
 * reachable only through a short-lived SAS URL minted per request, after the
 * session has been checked (see `blob.ts` and the download route).
 *
 * `blobName` is the object key in that container, NOT a URL.
 *
 * THIS MODULE IS SERVER-ONLY AND MUST STAY THAT WAY.
 * It is marked `server-only`, so importing it from a Client Component fails
 * the BUILD rather than silently shipping every storage key to the browser —
 * which is exactly what happened before this guard existed. Client components
 * import from `shared.ts` and receive data via `trustCentreListing()`.
 *
 * STATUS
 *   "uploaded"  — the file is in the container and downloadable.
 *   "prepared"  — approved and written, awaiting upload.
 * A document with no `blobName` is listed but not downloadable, which is why
 * the UI must key availability off the file's presence rather than the label.
 */

import "server-only";

import type {
  TrustCentreCategory,
  TrustCentreListing,
} from "@/lib/trust-centre/shared";

export interface TrustCentreDocument {
  /** Stable catalogue id, e.g. "TC-001". Used in URLs and audit logs. */
  id: string;
  title: string;
  category: TrustCentreCategory;
  status: "uploaded" | "prepared";
  /** Clause reference in the customer due-diligence questionnaire. */
  reference: string;
  /** Object key in the private container. Absent = nothing to download yet. */
  blobName?: string;
}

export const TRUST_CENTRE_DOCUMENTS: readonly TrustCentreDocument[] = [
  {
    id: "TC-001",
    title: "Business Continuity Plan",
    category: "A",
    status: "uploaded",
    reference: "1.1–1.3",
    blobName: "Lurny-BCP-Policy-and-Plan-LUR-BCP-001-v0.2.docx",
  },
  {
    id: "TC-003",
    title: "Disaster Recovery Policy and Plan",
    category: "A",
    status: "uploaded",
    reference: "1.4–1.5",
    blobName: "Lurny-Disaster-Recovery-Policy-and-Plan-LUR-DRP-001-v0.1.docx",
  },
  {
    id: "TC-004",
    title: "Backup Policy and Procedure",
    category: "A",
    status: "uploaded",
    reference: "1.6–1.8",
    blobName: "Lurny-Backup-Policy-and-Procedure-LUR-BKP-001.docx",
  },
  {
    id: "TC-005",
    title: "Information Security Policy",
    category: "B",
    status: "uploaded",
    reference: "2.1(a)",
    blobName: "Lurny-Information-Security-Policy-LURNY-ISMS-POL-001.docx",
  },
  {
    id: "TC-006",
    title: "Risk Management Policy and Risk Assessment Register",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(i), 2.3",
    blobName:
      "Lurny-Risk-Management-Policy-and-Register-LURNY-ISMS-RM-001.docx",
  },
  {
    id: "TC-007",
    title: "Password and Authentication Policy",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(ii)",
    blobName:
      "Lurny-Password-and-Authentication-Policy-LUR-IS-POL-PWD-001.docx",
  },
  {
    id: "TC-008",
    title: "Physical and Environmental Security Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(iii), 9.8",
    blobName:
      "Lurny-Physical-Environmental-Security-Policy-LURNY-ISMS-PHY-001.docx",
  },
  {
    id: "TC-009",
    title: "Change Management Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(iv)",
    blobName: "Lurny-Change-Management-Policy-LURNY-ISMS-CHG-001.docx",
  },
  {
    id: "TC-010",
    title: "Incident Management Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(v), 3.3, 9.4",
    blobName: "Lurny-Incident-Management-Policy-LURNY-ISMS-INC-001.docx",
  },
  {
    id: "TC-011",
    title: "Asset Management Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(vi)",
    blobName: "Lurny-Asset-Management-Policy-LURNY-ISMS-AST-001.docx",
  },
  {
    id: "TC-012",
    title: "Access Control Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(vii), 4.4–4.8",
    blobName: "Lurny-Access-Control-Policy-LURNY-ISMS-ACC-001.docx",
  },
  {
    id: "TC-013",
    title: "Network Security Policy and Procedure",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(viii), 9.3–9.4",
    blobName: "Lurny-Network-Security-Policy-LURNY-ISMS-NET-001.docx",
  },
  {
    id: "TC-014",
    title: "Patch Management Policy",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(ix), 9.2",
    blobName: "Lurny-Patch-Management-Policy-LURNY-ISMS-PAT-001.docx",
  },
  {
    id: "TC-015",
    title: "Logging and Monitoring Policy",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(x), 9.4–9.5",
    blobName: "Lurny-Logging-Monitoring-Policy-LURNY-ISMS-LOG-001.docx",
  },
  {
    id: "TC-016",
    title: "Acceptable Usage Policy — internal workforce",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(xi)",
    blobName: "Lurny-Acceptable-Usage-Policy-LURNY-ISMS-AUP-001.docx",
  },
  {
    id: "TC-017",
    title: "Secure Software Development Policy",
    category: "B",
    status: "uploaded",
    reference: "2.1(b)(xii)",
    blobName:
      "Lurny-Secure-Software-Development-Policy-LURNY-ISMS-SSD-001.docx",
  },
  {
    id: "TC-018",
    title: "System Hardening Standards and Procedure",
    category: "B",
    status: "uploaded",
    reference: "9.1",
    blobName: "Lurny-System-Hardening-Standards-LURNY-ISMS-HARD-001.docx",
  },
  {
    id: "TC-019",
    title: "Vulnerability Management and Penetration Testing Policy",
    category: "B",
    status: "uploaded",
    reference: "9.6–9.7",
    blobName:
      "Lurny-Vulnerability-Management-Pentest-Policy-LURNY-ISMS-VUL-001.docx",
  },
  {
    id: "TC-020",
    title: "Remote Access / Teleworking Procedure",
    category: "B",
    status: "uploaded",
    reference: "9.9",
    blobName:
      "Lurny-Remote-Access-Teleworking-Procedure-LURNY-ISMS-REM-001.docx",
  },
  {
    id: "TC-021",
    title: "Internal Data Privacy Policy and Procedure",
    category: "C",
    status: "uploaded",
    reference: "3.2",
    blobName: "Lurny-Internal-Data-Privacy-Policy-LURNY-ISMS-PRI-001.docx",
  },
  {
    id: "TC-022",
    title: "Information Classification and Handling Policy",
    category: "C",
    status: "uploaded",
    reference: "4.1",
    blobName:
      "Lurny-Information-Classification-Handling-Policy-LURNY-ISMS-ICH-001.docx",
  },
  {
    id: "TC-023",
    title: "Encryption and Key Management Policy",
    category: "C",
    status: "uploaded",
    reference: "4.9",
    blobName: "Lurny-Encryption-Key-Management-Policy-LURNY-ISMS-EKM-001.docx",
  },
  {
    id: "TC-024",
    title: "Data Retention, Return and Secure Disposal Policy",
    category: "C",
    status: "uploaded",
    reference: "4.10–4.11",
    blobName:
      "Lurny-Data-Retention-Return-Disposal-Policy-LURNY-ISMS-RET-001.docx",
  },
  {
    id: "TC-025",
    title: "Human Resource Security Policy",
    category: "D",
    status: "uploaded",
    reference: "5.1",
    blobName: "Lurny-Human-Resource-Security-Policy-LURNY-ISMS-HRS-001.docx",
  },
  {
    id: "TC-026",
    title: "Background Screening Policy and Procedure",
    category: "D",
    status: "uploaded",
    reference: "5.2",
    blobName: "Lurny-Background-Screening-Policy-LURNY-ISMS-BGS-001.docx",
  },
  {
    id: "TC-027",
    title: "Security and Privacy Awareness Policy / Procedure",
    category: "D",
    status: "uploaded",
    reference: "5.3",
    blobName: "Lurny-Security-Privacy-Awareness-Policy-LURNY-ISMS-AWR-001.docx",
  },
  {
    id: "TC-028",
    title: "Code of Conduct and Disciplinary Procedure",
    category: "D",
    status: "uploaded",
    reference: "5.4",
    blobName: "Lurny-Code-of-Conduct-Disciplinary-Procedure.docx",
  },
  {
    id: "TC-029",
    title: "Legal and Regulatory Compliance Procedure and Obligations Register",
    category: "D",
    status: "uploaded",
    reference: "6.1",
    blobName:
      "Lurny-Legal-Regulatory-Compliance-Procedure-LURNY-ISMS-LRC-001.docx",
  },
  {
    id: "TC-030",
    title: "Customer Feedback, Complaints and Dispute Resolution Procedure",
    category: "D",
    status: "uploaded",
    reference: "7.1, 7.3",
    blobName:
      "Lurny-Customer-Feedback-Complaints-Dispute-Procedure-LURNY-GOV-CFR-001.docx",
  },
  {
    id: "TC-031",
    title: "Conflict of Interest Procedure",
    category: "D",
    status: "uploaded",
    reference: "7.6",
    blobName: "Lurny-Conflict-of-Interest-Procedure-LURNY-GOV-COI-001.docx",
  },
  {
    id: "TC-032",
    title: "Third-Party Risk Management Policy and Procedure",
    category: "D",
    status: "uploaded",
    reference: "10.1–10.4",
    blobName:
      "Lurny-Third-Party-Risk-Management-Policy-LURNY-ISMS-TPR-001.docx",
  },
  {
    id: "TC-033",
    title: "Network Architecture and Deployment Notes",
    category: "E",
    status: "prepared",
    reference: "1.9, 4.2, 9.10",
  },
  {
    id: "TC-034",
    title: "Public Privacy Policy",
    category: "E",
    status: "uploaded",
    reference: "Website/service privacy notice",
  },
  {
    id: "TC-035",
    title: "Cookie Policy and Inventory",
    category: "E",
    status: "uploaded",
    reference: "Cookie notice and inventory",
  },
  {
    id: "TC-036",
    title: "Customer Acceptable Use Policy",
    category: "E",
    status: "uploaded",
    reference: "Customer/service use",
  },
  {
    id: "TC-037",
    title: "Website Terms of Service",
    category: "E",
    status: "uploaded",
    reference: "Website terms",
  },
  {
    id: "TC-038",
    title: "Data Processing Addendum",
    category: "E",
    status: "uploaded",
    reference: "Data-processing contract template",
    blobName: "Lurny-Data-Processing-Addendum-LG-05.docx",
  },
  {
    id: "TC-039",
    title: "Service Level and Support Schedule",
    category: "E",
    status: "uploaded",
    reference: "Service/support template",
    blobName: "Lurny-Service-Level-Support-Schedule-LG-06.docx",
  },
  {
    id: "TC-040",
    title: "Enterprise Services Agreement",
    category: "E",
    status: "uploaded",
    reference: "Enterprise agreement template",
    blobName: "Lurny-Enterprise-Services-Agreement-LG-07.docx",
  },
  {
    id: "TC-041",
    title: "Trial and Sandbox Terms",
    category: "E",
    status: "uploaded",
    reference: "Evaluation terms",
    blobName: "Lurny-Trial-Sandbox-Terms-LG-08.docx",
  },
  {
    /* The ISO 27001 certificate is the single most-requested artefact in a
       due-diligence review, so it is listed first in its category rather than
       appended at the end. Category F ("Reference and archive") is where
       evidence of certification belongs, as distinct from the policies that
       implement it. */
    id: "TC-043",
    title: "ISO/IEC 27001:2022 Certificate",
    category: "F",
    status: "uploaded",
    reference: "Certification evidence",
    blobName: "Lurny-ISO-27001-2022-Certificate-IN62659E.pdf",
  },
  {
    id: "TC-042",
    title: "Compliance and Security Overview",
    category: "E",
    status: "uploaded",
    reference: "Explanatory overview",
  },
] as const;

/** Lookup by id. Built once; the catalogue is static. */
const byId = new Map(TRUST_CENTRE_DOCUMENTS.map((doc) => [doc.id, doc]));

export function findTrustCentreDocument(
  id: string,
): TrustCentreDocument | undefined {
  return byId.get(id);
}

/**
 * The client-safe projection: the catalogue with `blobName` removed.
 *
 * The storage key is useless without a SAS signature, but it still names
 * internal infrastructure, and there is no reason for the browser to hold it.
 * `downloadable` carries the only thing the UI actually needed it for.
 *
 * The RESULT of this call is what crosses to the client. The module itself
 * must not — see the note in shared.ts.
 */
export function trustCentreListing(): TrustCentreListing[] {
  return TRUST_CENTRE_DOCUMENTS.map(({ blobName, ...rest }) => ({
    ...rest,
    downloadable: Boolean(blobName),
  }));
}
