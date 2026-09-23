# Trust Centre

The credentialed document portal at `/trust-centre`. Client reviewers sign in
with one shared credential and download Lurny's policies and due-diligence
documents.

## This is not the user login

Everything here is namespaced `trustCentre` / `tc_` / `TRUST_CENTRE_*` and is
imported by nothing outside this folder. When the product's real user
authentication is built it gets its own module, cookie and secret.

The separation is deliberate. This is **one shared password** handed to
external reviewers for read access to internal documents. It must never
become, or be confused with, a per-person account — not in a cookie jar, not
in a log, and not at a call site.

## How a request is protected

Two independent checks, on purpose:

1. **`src/proxy.ts`** (Next 16's Middleware — renamed to `proxy.ts`, a
   `middleware.ts` would never run). Verifies the cookie signature and
   redirects. Cheap, no I/O, runs on every navigation. Per the Next docs this
   is an *optimistic* check, not the boundary.
2. **`guard.ts`**, called by every protected page and route. This is the real
   boundary. A routing mistake cannot open anything, because the route itself
   still refuses.

## How documents are served

Documents live in a **private** Azure Blob container. Nothing is downloadable
by URL alone.

`/api/trust-centre/download/<id>` takes a **catalogue id**, never a path. It
checks the session, looks the storage key up in a fixed server-side table,
then 302s to a SAS URL that is read-only, scoped to one blob, and valid for
five minutes. Path traversal is structurally impossible: no user-controlled
string reaches the blob name.

The bytes never pass through our server.

## Keeping storage keys off the client

`catalogue.ts` is marked `server-only`. Client components import labels and
types from `shared.ts` and receive data through `trustCentreListing()`.

This is not theoretical. Before the split, `DocumentLibrary` imported the
category labels from `catalogue.ts` and the bundler inlined **all 31 storage
keys into a public JavaScript chunk**. Stripping them at runtime did not help,
because the data was already in the bundle. Never import `catalogue.ts` from a
`"use client"` file.

## The account

One account, `ayush@lurny.ai` (override with `TRUST_CENTRE_EMAIL`), stored in
the `trust_centre_accounts` collection in MongoDB.

**It is created automatically on first server boot** — there is no setup
command. `src/instrumentation.ts` calls `ensureTrustCentreAccount()` once per
server instance:

- **Account already exists** → left completely alone, password included.
- **No account** → one is created with `TRUST_CENTRE_PASSWORD`.

That asymmetry is the point. Once you change the password, a redeploy can
never put the old one back.

Several pods booting at once is safe: a unique index on `email` makes the
database the arbitrator, and the losing insert's duplicate-key error is
treated as success.

### Which password is used at creation

| Situation | Result |
|---|---|
| `TRUST_CENTRE_PASSWORD` set | That password is used. **This is the production path.** |
| `TRUST_CENTRE_ALLOW_DEV_PASSWORD=true` | The public default in `account.ts` is used — local development only. |
| Neither | **No account is created and nobody can sign in.** Fails closed, with an explanatory log line. |

`TRUST_CENTRE_ALLOW_DEV_PASSWORD` is an explicit flag rather than a
`NODE_ENV` check on purpose: `next build` bakes `NODE_ENV=production` into the
standalone server, so NODE_ENV cannot distinguish "developer running a prod
build locally" from "real deployment". Using the committed password has to be
a deliberate act.

## Setup

```bash
# 1. Point MONGODB_URI at your database and set TRUST_CENTRE_SECRET.
#    In production also set TRUST_CENTRE_PASSWORD. See .env.example.

# 2. Start the app. The account is created on boot.
npm run dev

# 3. Create the container — public access MUST be off.
az storage container create -n lurny-trust-centre \
  --account-name <account> --public-access off

# 4. Upload the documents.
npm run trust-centre:upload -- ./path/to/documents --dry-run
npm run trust-centre:upload -- ./path/to/documents
```

The upload script only uploads files the catalogue lists, and reports both
unlisted files and catalogue entries with no file. To add a document, add an
entry to `catalogue.ts` with the filename as `blobName`, then upload.

## Operations

**Revoke all access immediately:** change `TRUST_CENTRE_SECRET` and redeploy.
Every outstanding session is invalidated at once.

**Change the password:** `npm run trust-centre:password`. It updates the
database, takes effect immediately with no redeploy, and existing sessions
survive unless the secret also changes. Editing `TRUST_CENTRE_PASSWORD` in the
environment does nothing once the account exists.

**Disable access without deleting anything:** set `active: false` on the
account row. Sign-in then fails as if the account did not exist.

**Audit trail:** every sign-in, failure, sign-out and download is written to
the `trust_centre_audit` collection in MongoDB. Audit writes never fail a
request — a Mongo outage degrades the trail, it does not take the portal down.

**Fails closed** throughout: no account, no password configured, a malformed
stored hash, or a database outage all refuse the sign-in rather than allow it.

## Known limits

- **Rate limiting is per-process and in-memory** (`rate-limit.ts`). It resets
  on deploy and is not shared across replicas, so N pods give an attacker N
  times the budget. Acceptable for one credential and a handful of users; back
  it with Mongo if the deployment scales out.
- **Sessions cannot be revoked individually.** Stateless by design; rotating
  the secret revokes everyone. That is the right trade for a shared credential.
- **Documents are `.docx`**, so browsers download rather than preview them.
  Converting to PDF would allow in-browser viewing.
- **The development password is public.** It is committed in `account.ts` and
  cannot be removed from git history. It is unusable without
  `TRUST_CENTRE_ALLOW_DEV_PASSWORD=true`, which must never be set in
  production.
