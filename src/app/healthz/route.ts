/**
 * GET /healthz
 * ---------------------------------------------------------------------------
 * Liveness/readiness endpoint for the Kubernetes probes and uptime checks.
 * Deliberately trivial: it answers as soon as the Next server is up and does
 * NOT touch MongoDB, so a database outage never takes the site itself down.
 * (nginx used to answer this when the site was a static export.)
 */

export const dynamic = "force-dynamic";

export function GET() {
  return new Response("ok\n", {
    status: 200,
    headers: { "content-type": "text/plain", "cache-control": "no-store" },
  });
}
