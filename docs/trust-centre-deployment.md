# elurny.com — production environment variables

Handover for Ops deploying the Trust Centre release to AKS
(`prod` namespace, `elurny-website` deployment).

**No secret values appear in this document.** It lists what to set and where to
get each value. Send the values themselves through the secret manager, not
over chat or email.

---

## 1. Breaking change: the container port moved

This release changes elurny.com from a static nginx image to a Next.js server.

| | Before | After |
|---|---|---|
| Image | nginx serving static files | Node serving the app |
| Port | **80** | **3000** |

`.github/workflows/deploy-aks.yml` already passes `app_port: "3000"`. **If the
Service `targetPort` is pinned anywhere else, it must be updated to 3000**, or
the rollout will report healthy while every request times out.

The app listens on `0.0.0.0:3000` (`PORT` / `HOSTNAME` in the Dockerfile).

### Health check

`GET /healthz` no longer exists — it was an nginx route. Use `GET /` for
liveness and readiness.

---

## 2. Required variables

The deployment will not work correctly without all of these.

### Build-time

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://elurny.com` | Already a Dockerfile `ARG`. Baked in at build; changing it later needs a rebuild, not a restart. |

### Runtime — database

| Variable | Where to get it | Notes |
|---|---|---|
| `MONGODB_URI` | Existing Atlas connection string | Same database the site already uses. |
| `MONGODB_DB` | `elurny` | |

Three collections are used: `leads` (existing), plus
`trust_centre_accounts` and `trust_centre_audit` (created automatically).

### Runtime — Trust Centre

| Variable | Value | Notes |
|---|---|---|
| `TRUST_CENTRE_EMAIL` | `ayush@lurny.ai` | Not a secret. Changing this and restarting renames the account. |
| `TRUST_CENTRE_PASSWORD` | **Ask Aaush** | The live password. Changing this and restarting changes the credential. See §4. |
| `TRUST_CENTRE_SECRET` | **Ask Aaush** | Signs session cookies. Min 32 chars. A fresh value has been generated — do not reuse the development one. |
| `TRUST_CENTRE_ACCOUNT_LABEL` | `Lurny` | Not a secret. Shown in the portal header. |

### Runtime — Azure Blob Storage

| Variable | Value | Notes |
|---|---|---|
| `AZURE_STORAGE_ACCOUNT` | `elurnydocumentation` | Resource group `AKS-Lunry`, Central India. |
| `AZURE_STORAGE_KEY` | Azure portal → storage account → Access keys | **Sensitive — see §5.** |
| `TRUST_CENTRE_CONTAINER` | `lurny-trust-centre` | Already created and populated (36 documents). |

---

## 3. Optional variables

Leave unset unless you intend the behaviour.

| Variable | Effect if set |
|---|---|
| `AZURE_STORAGE_ENDPOINT` | Overrides the blob endpoint. Only for Azurite or a private endpoint. |
| `RESEND_API_KEY` | Enables lead-notification emails. Without it, leads are still saved and the notification is recorded as unsent. |
| `LEADS_NOTIFY_TO` / `LEADS_NOTIFY_FROM` | Recipients for lead notifications. |

### Must NOT be set in production

| Variable | Why |
|---|---|
| `TRUST_CENTRE_ALLOW_DEV_PASSWORD` | Seeds the account with a password that is **public in the git repository**. Local development only. Setting it in production would give anyone with repo access the ability to sign in. |

---

## 4. How the portal account works

**`TRUST_CENTRE_EMAIL` and `TRUST_CENTRE_PASSWORD` are the source of truth.**
On every startup the app reconciles the account in MongoDB against them:

| Situation | What happens on boot |
|---|---|
| No account yet | Created with the configured email and password. |
| Password in the secret changed | **Stored password is updated.** Old one stops working. |
| Email in the secret changed | Account is **renamed** — not duplicated. The old address stops working. |
| Nothing changed | No write. Startup is silent. |

So to change the portal password: **update the Kubernetes secret and restart
the deployment.** No code change, no migration, no script.

The database row is a cache of that decision, not a second place the truth
might live.

### Changing the password without a redeploy

`npm run trust-centre:password` edits the database directly and takes effect
immediately. **But the next restart will reset it to whatever
`TRUST_CENTRE_PASSWORD` says.** That script is only for deployments where
`TRUST_CENTRE_PASSWORD` is left unset — in which case the app logs, on every
boot:

```
[trust-centre] account <email> exists and TRUST_CENTRE_PASSWORD is not set;
its password is managed in the database.
```

Pick one mode and stay in it. The startup log always states which is in force.

### Fails closed

With `TRUST_CENTRE_PASSWORD` unset **and** no existing account, no account is
created and nobody can sign in. The log says so explicitly.

### Revoking access immediately

Change `TRUST_CENTRE_SECRET` and restart. Every outstanding session is
invalidated at once — this is independent of the password.

## 5. Handling `AZURE_STORAGE_KEY`

This key grants **full read/write/delete on the entire storage account**, not
just the Trust Centre container. Treat it like a root credential:

- Put it in the Kubernetes secret directly; do not paste it into chat, email,
  a ticket, or a CI log.
- It is rotatable — Azure provides two keys so you can roll one while the
  other stays live.

The application uses it only to sign short-lived (5-minute) read-only download
URLs. It is never sent to a browser.

A narrower alternative, if you would rather not hand over an account key: a
**user delegation SAS** via Managed Identity, scoped to just this container.
That is a code change (small) — say the word and it can be done before release.

---

## 6. Verifying the deployment

```bash
# 1. Marketing site serves.
curl -sI https://elurny.com | head -1                      # expect 200

# 2. Portal redirects when signed out.
curl -sI https://elurny.com/trust-centre | head -1         # expect 307

# 3. Documents are not reachable without a session.
curl -sI https://elurny.com/api/trust-centre/download/TC-001 | head -1   # expect 401

# 4. Storage is private.
curl -sI "https://elurnydocumentation.blob.core.windows.net/lurny-trust-centre/Lurny-BCP-Policy-and-Plan-LUR-BCP-001-v0.2.docx" | head -1
# expect 404 or 409 — NOT 200
```

Then confirm in the pod logs on first boot:

```
[trust-centre] created reviewer account for ayush@lurny.ai
```

If instead you see `no account exists and TRUST_CENTRE_PASSWORD is not set`,
the secret did not reach the pod.

Finally, have Aaush sign in at `https://elurny.com/trust-centre` and download
one document.

---

## 7. Notes

- `/trust-centre` is `noindex` and sends `Cache-Control: no-store`. If any CDN
  or ingress cache sits in front of elurny.com, **exclude `/trust-centre*` and
  `/api/trust-centre*`** — a cached authenticated page served to the next
  visitor would expose the document library.
- `nginx.conf` remains in the repo but is **no longer used by the image**. It
  is kept as the ingress hop's reference. The ingress must continue to set
  `X-Forwarded-For`; the sign-in rate limiter uses it to identify callers.
- Every sign-in, failure, sign-out and download is written to the
  `trust_centre_audit` collection.
