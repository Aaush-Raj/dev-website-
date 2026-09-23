# ---------------------------------------------------------------------------
# elurny.com — Next.js server (standalone) behind nginx.
#
# Stage 1 builds the app. Stage 2 runs it with Node.
#
# WHY THIS IS NO LONGER A STATIC NGINX IMAGE
# The site was `output: "export"` served by nginx alone. The Trust Centre
# (/trust-centre) needs cookies, Proxy and Route Handlers, none of which exist
# in a static export, so the app now runs as a real server. nginx stays in
# front of it in the cluster as the TLS/ingress hop.
#
# Built and deployed by .github/workflows/deploy-aks.yml (AKS, namespace
# `prod`, deployment/service `elurny-website`, behind the `prod/lurny-talk`
# ingress for elurny.com + www.elurny.com).
# ---------------------------------------------------------------------------

FROM node:22-alpine AS build

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Canonical origin baked into canonical URLs, OG tags, sitemap and robots.
# NEXT_PUBLIC_* is inlined at BUILD time, so it must be present here.
ARG NEXT_PUBLIC_SITE_URL=https://elurny.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user. The Trust Centre handles credentials and signs
# storage URLs; a container process that cannot write its own filesystem is
# one less thing an RCE could turn into persistence.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# `output: "standalone"` traces only the files the server actually needs,
# including a minimal node_modules — so no `npm ci` here and a much smaller
# image. Static assets and public/ are NOT included by that trace and must be
# copied alongside it, or every stylesheet and image 404s.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# server.js is emitted by the standalone build.
CMD ["node", "server.js"]
