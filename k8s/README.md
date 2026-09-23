# Kubernetes notes — elurny.com

The site runs on AKS (cluster `lurny`, resource group `AKS-Lunry`), namespace
`prod`, deployment + service `elurny-website`. Routing/TLS for `elurny.com` and
`www.elurny.com` is the in-cluster ingress `prod/lurny-talk` (not in any repo),
backend `elurny-website:80`.

CI (`.github/workflows/deploy-aks.yml`) builds the image and only runs
`kubectl set image`; it does not manage env, ports, probes or secrets. Those
were set up once with the files here (2026-09-23, static-export → Node
`next start` switch):

| File | Purpose | Apply |
| --- | --- | --- |
| `secret.example.yaml` | Template for the `elurny-website-env` Secret (Mongo `website-lurny` on the shared prod Atlas cluster, mail, Trust Centre / Azure Storage). Placeholders only — real values never leave the cluster. | see header of the file |
| `deployment-patch.yaml` | Container port `http`=3000, `envFrom` the secret, probes on `/healthz`, resources. | `kubectl -n prod patch deployment elurny-website --patch-file k8s/deployment-patch.yaml` |
| `service-patch.yaml` | Service 80 → container port 3000 (numeric; a named targetPort breaks the app-routing ingress). | `kubectl -n prod patch service elurny-website --patch-file k8s/service-patch.yaml` |

## Rotating a secret value

```sh
kubectl -n prod create secret generic elurny-website-env \
  --from-literal=MONGODB_URI='...' \
  --from-literal=MONGODB_DB='website-lurny' \
  --from-literal=LEADS_NOTIFY_TO='...' \
  --from-literal=LEADS_NOTIFY_FROM='Lurny Website <website@elurny.com>' \
  --from-literal=RESEND_API_KEY='...' \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl -n prod rollout restart deployment/elurny-website
```

Env is read at process start, so a restart is required after changing it.

Still unset as of 2026-09-23: `LEADS_NOTIFY_TO` and `RESEND_API_KEY` — leads are
stored with `notified: false` until they are added.

## Checks

```sh
kubectl -n prod get deploy,svc,pods -l app=elurny-website
kubectl -n prod exec deploy/elurny-website -- env | grep -E 'MONGODB|LEADS|RESEND' | sed 's/=.*/=***/'
curl -sI https://elurny.com/healthz
curl -s -X POST https://elurny.com/api/lead -H 'content-type: application/json' -d '{}'   # 400 = route live
```
