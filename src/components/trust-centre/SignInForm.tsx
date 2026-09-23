"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";

/**
 * TRUST CENTRE — SIGN-IN FORM
 * ---------------------------------------------------------------------------
 * The only Client Component in the portal's auth path.
 *
 * WHAT IT IS NOT
 * It does not decide anything. It collects two fields, posts them, and renders
 * whatever the server says. There is no credential here, no list of valid
 * emails, and no "if (password === ...)" — all of that lives on the server, so
 * reading this bundle teaches an attacker nothing.
 *
 * `router.refresh()` RATHER THAN `push`
 * The session cookie is set by the response to our POST. A client-side push
 * would navigate with the layout React already has in memory, which was
 * rendered for a signed-out visitor. `refresh()` re-fetches from the server
 * with the new cookie attached, so the portal renders as signed-in.
 */

export function SignInForm({ next }: { next?: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) return;
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/trust-centre/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Same-origin, so the Set-Cookie on the response is honoured.
        body: JSON.stringify({ email, password }),
      });

      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Sign-in failed. Please try again.");
        setPassword("");
        setPending(false);
        return;
      }

      /*
       * `next` is validated on the server before it reaches this component,
       * but it is re-checked here too: it must be a same-site absolute path.
       * A value like "//evil.example" is a protocol-relative URL that browsers
       * treat as another origin, which is why "starts with /" alone is not
       * enough.
       */
      const safeNext =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/trust-centre";

      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="text-sm font-medium text-text-primary">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={pending}
          className="mt-1 block h-11 w-full rounded-lg border-[1.5px] border-border-default bg-surface-raised px-3 text-sm text-text-primary outline-none focus:border-border-brand focus:ring-2 focus:ring-border-brand/30 disabled:opacity-60"
        />
      </label>

      <label className="text-sm font-medium text-text-primary">
        Password
        <span className="relative mt-1 block">
          <input
            type={visible ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={pending}
            className="block h-11 w-full rounded-lg border-[1.5px] border-border-default bg-surface-raised pr-16 pl-3 text-sm text-text-primary outline-none focus:border-border-brand focus:ring-2 focus:ring-border-brand/30 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            /* Describes the ACTION, not the state: a screen reader user needs
               to know what pressing it will do. */
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute top-0 right-2 h-11 cursor-pointer border-none bg-transparent text-xs font-semibold text-text-secondary hover:text-text-primary"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </span>
      </label>

      {error ? (
        /* `role="alert"` so the failure is announced, not just displayed —
           otherwise a screen reader user submits and hears nothing. */
        <p
          role="alert"
          className="rounded-lg bg-status-danger-subtle px-3 py-2.5 text-sm text-status-danger"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
