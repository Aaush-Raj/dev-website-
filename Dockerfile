# ---------------------------------------------------------------------------
# elurny.com — static Next.js export served by nginx.
#
# Stage 1 builds the site (`next build` with output: "export" -> out/).
# Stage 2 copies out/ into a plain nginx image. No Node at runtime.
#
# Built and deployed by .github/workflows/deploy-aks.yml (AKS, namespace
# `prod`, deployment/service `elurny-website`, behind the `prod/lurny-talk`
# ingress for elurny.com + www.elurny.com).
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

# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
