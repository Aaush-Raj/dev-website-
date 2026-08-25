/**
 * INDUSTRY ICONS
 * ---------------------------------------------------------------------------
 * The six glyphs in the "Industries we serve" grid.
 *
 * DUOTONE, unlike the single-colour icon sets elsewhere on the site: each is
 * a violet line drawing with exactly ONE amber element — the coin, the signal
 * waves, the pulse trace, the gear, the case clasp, the shopping bag. That
 * pairing is what the design uses to tie the set together, so the two colours
 * are baked in here rather than inherited.
 *
 * Drawn on a 40x40 grid at a 1.8 stroke, which is the weight the design draws
 * them at once the tile is accounted for.
 *
 * `industryIcons` is a lookup keyed by the `icon` strings in
 * content/industries-page.ts, so the content picks a glyph by name without
 * importing anything.
 */

interface IconProps {
  className?: string;
}

/** The violet line work. */
const line = {
  fill: "none",
  stroke: "var(--brand-600)",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** The single amber element each icon carries. */
const accent = {
  fill: "none",
  stroke: "var(--accent-400)",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const box = { viewBox: "0 0 40 40", "aria-hidden": true } as const;

/** A classical bank facade with a coin. Banking & Financial Services. */
export function BankIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      {/* Pediment and steps. */}
      <path {...line} d="M6.5 15.5 20 7.5l13.5 8" />
      <path {...line} d="M7 15.5h26" />
      <path {...line} d="M6 31.5h28M8.5 28h23" />
      {/* Columns. Four rather than three, so the coin sits in the gap
          between the inner pair instead of crossing a shaft. */}
      <path {...line} d="M11 18.5v9.5M15 18.5v9.5M25 18.5v9.5M29 18.5v9.5" />
      {/* The coin, the icon's one amber element. */}
      <circle {...accent} cx="20" cy="23.6" r="5" />
      <path
        {...accent}
        d="M20 20.9v5.4M18.5 21.9h2.3a1.2 1.2 0 0 1 0 2.4h-1.6a1.2 1.2 0 0 0 0 2.4h2.3"
      />
    </svg>
  );
}

/** A transmission mast with radiating waves. Telecom. */
export function TowerIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      {/* The mast: two splayed legs, cross-bracing, a base. */}
      <path {...line} d="M15.6 32.5 19.2 16h1.6l3.6 16.5" />
      <path {...line} d="M17.4 24h5.2M16.6 28.4h6.8" />
      <path {...line} d="m17.4 24 5.2 4.4M22.6 24l-5.2 4.4" />
      <path {...line} d="M13.5 32.5h13" />
      {/* The emitter and its waves — the amber element. */}
      <circle {...line} cx="20" cy="12.4" r="2.6" />
      <path
        {...accent}
        d="M15.4 15.6a6.2 6.2 0 0 1 0-8.4M24.6 7.2a6.2 6.2 0 0 1 0 8.4"
      />
      <path
        {...accent}
        d="M12.6 18a10 10 0 0 1 0-13.4M27.4 4.6a10 10 0 0 1 0 13.4"
      />
    </svg>
  );
}

/** A heart crossed by an ECG trace. Healthcare. */
export function HeartbeatIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path
        {...line}
        d="M20 32.5 8.9 21.9a6.9 6.9 0 0 1 0-9.9 7.4 7.4 0 0 1 10.2 0l.9.9.9-.9a7.4 7.4 0 0 1 10.2 0 6.9 6.9 0 0 1 0 9.9z"
      />
      {/* The trace, the icon's one amber element. */}
      <path {...accent} d="M8 21.6h5.4l2.2-4.8 3.4 9.2 2.6-6 1.7 3.4H32" />
    </svg>
  );
}

/** A plant silhouette with a gear. Manufacturing. */
export function FactoryIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      {/* The saw-tooth roofline and the wall. */}
      <path
        {...line}
        d="M8 31.5V10.5h2.6v10.2l6.4-5.2v5.2l6.4-5.2v5.2l6.4-5.2V31.5"
      />
      <path {...line} d="M7 31.5h26" />
      <path {...line} d="M12 26.6h6M12 29h4" />
      {/* The gear, the icon's one amber element. */}
      <circle {...accent} cx="26.4" cy="26.6" r="2.7" />
      <path
        {...accent}
        d="M26.4 20.9v1.6M26.4 30.7v1.6M20.7 26.6h1.6M30.5 26.6h1.6M22.4 22.6l1.1 1.1M29.3 29.5l1.1 1.1M30.4 22.6l-1.1 1.1M23.5 29.5l-1.1 1.1"
      />
    </svg>
  );
}

/** A case above two figures. Professional Services. */
export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      {/* The case and its handle. */}
      <rect {...line} x="9.5" y="11.5" width="21" height="11.4" rx="2.2" />
      <path
        {...line}
        d="M16.6 11.5V9.8a1.8 1.8 0 0 1 1.8-1.8h3.2a1.8 1.8 0 0 1 1.8 1.8v1.7"
      />
      <path {...line} d="M9.5 15.4c3.9 2.2 7.4 3.3 10.5 3.3s6.6-1.1 10.5-3.3" />
      {/* The clasp, the icon's one amber element. */}
      <rect {...accent} x="18.2" y="16.8" width="3.6" height="3" rx="0.8" />
      {/* Two figures beneath. */}
      <circle {...line} cx="14.6" cy="27.6" r="2.8" />
      <path {...line} d="M9.6 34.5a5 5 0 0 1 10 0" />
      <circle {...line} cx="25.4" cy="27.6" r="2.8" />
      <path {...line} d="M20.4 34.5a5 5 0 0 1 10 0" />
    </svg>
  );
}

/** A shopfront awning with a bag. Retail. */
export function StorefrontIcon({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      {/* The awning: a scalloped canopy over the shop. */}
      <path {...line} d="M7 17.5 10.2 9h19.6L33 17.5z" />
      <path {...line} d="M7 17.5h26" />
      <path {...line} d="M13.5 9v8.5M20 9v8.5M26.5 9v8.5" />
      {/* The shop below. */}
      <path {...line} d="M9.6 17.5v14.9h20.8V17.5" />
      <path {...line} d="M8.6 32.4h9.4M13 28.4h5" />
      {/* The bag, the icon's one amber element. */}
      <path {...accent} d="M20.4 23.4h9.8l-1.1 9H21.5z" />
      <path {...accent} d="M23.1 23.4v-1.5a2.2 2.2 0 0 1 4.4 0v1.5" />
    </svg>
  );
}

/** Keyed by the `icon` strings in content/industries-page.ts. */
export const industryIcons = {
  bank: BankIcon,
  tower: TowerIcon,
  heartbeat: HeartbeatIcon,
  factory: FactoryIcon,
  briefcase: BriefcaseIcon,
  storefront: StorefrontIcon,
} as const;
