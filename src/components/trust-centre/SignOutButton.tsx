"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * TRUST CENTRE — SIGN OUT
 * ---------------------------------------------------------------------------
 * POSTs to the sign-out route, then sends the browser to the sign-in page.
 *
 * `router.refresh()` after `replace` is what actually clears the portal from
 * the client cache. Without it, React keeps the rendered library in memory and
 * a Back press can redisplay it from cache even though the cookie is gone —
 * the page would be inert, but the document titles would still be on screen.
 * The `no-store` header set in next.config.ts covers the browser's own cache;
 * this covers React's.
 */

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    if (pending) return;
    setPending(true);

    try {
      await fetch("/api/trust-centre/signout", { method: "POST" });
    } catch {
      // Ignored: the redirect below happens regardless. If the request never
      // landed, the cookie survives, but the gate re-checks it on every
      // request anyway — so the worst case is an unexpired session, not an
      // authenticated view left open.
    }

    router.replace("/trust-centre/signin");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="cursor-pointer border-none bg-transparent text-sm font-medium text-text-brand disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Log out"}
    </button>
  );
}
