# ---------------------------------------------------------------------------
# elurny.com — Next.js server (`next start`) on Node.
#
# Stage 1 installs everything and runs `next build` (.next/).
# Stage 2 is a lean runtime: production node_modules + .next + public, running
# as a non-root user on port 3000.
#
# Built and deployed by .github/workflows/deploy-aks.yml (AKS, namespace
# `prod`, deployment/service `elurny-website`, behind the `prod/lurny-talk`
# ingress for elurny.com + www.elurny.com).
#
# Runtime configuration (MONGODB_URI, MONGODB_DB, LEADS_NOTIFY_TO,
# LEADS_NOTIFY_FROM, RESEND_API_KEY) is NOT baked in — it comes from the
# Kubernetes secret `elurny-website-env` (see k8s/README.md).
# ---------------------------------------------------------------------------

FROM node:22-alpine AS build

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Canonical origin baked into canonical URLs, OG tags, sitemap and robots.
ARG NEXT_PUBLIC_SITE_URL=https://elurny.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Production-only dependencies for the runtime image.
RUN npm prune --omit=dev --no-audit --no-fund

# ---------------------------------------------------------------------------
FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# `next start` re-reads the public env at request time for server code, but
# NEXT_PUBLIC_* values were inlined at build time above; keep them consistent.
ARG NEXT_PUBLIC_SITE_URL=https://elurny.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/next.config.ts ./
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next ./.next

USER node

EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000"]
