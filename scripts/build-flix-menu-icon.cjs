/**
 * LURNYFLIX MEGA-MENU ICON
 * ---------------------------------------------------------------------------
 * The design pack for the LurnyFlix page ships no menu icon, so this draws one
 * to match the ten engine marks already in public/assets/icons/engines.
 *
 * WHY IT IS GENERATED RATHER THAN DRAWN INLINE
 * The Platform menu sets `iconPath`, which means every item in it is a painted
 * PNG with the lavender disc baked into the asset — MegaMenu draws no disc of
 * its own for those panels. Adding an eleventh entry that needed inline SVG
 * would mean special-casing one item against the menu's own contract, so this
 * emits a PNG at the same 128x128 the others use instead.
 *
 * THE MARK follows the set's shared vocabulary, read off events.png: a
 * lavender disc, a violet line glyph, and exactly one amber accent. Here that
 * is a film frame with a play triangle, the amber carrying the play.
 *
 * Replace the file if real artwork is supplied later; nothing else changes.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public/assets/icons/engines/flix.png");

/** Sampled from the existing engine icons. */
const DISC = "#ece7f8";
const VIOLET = "#6d3bd4";
const AMBER = "#f7a325";

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="60" fill="${DISC}"/>

  <!-- The film frame. -->
  <rect x="26" y="38" width="62" height="52" rx="9"
        fill="none" stroke="${VIOLET}" stroke-width="5"/>
  <!-- Its perforations, as the set's line weight. -->
  <path d="M40 38v52M74 38v52" stroke="${VIOLET}" stroke-width="4" opacity="0.55"/>

  <!-- The amber accent: the play control, overlapping the frame's corner the
       way events.png overlaps its calendar. -->
  <circle cx="88" cy="80" r="20" fill="${DISC}"/>
  <circle cx="88" cy="80" r="17" fill="none" stroke="${AMBER}" stroke-width="5"/>
  <path d="M83.5 71.5 96 80l-12.5 8.5Z" fill="${AMBER}"/>
</svg>`;

sharp(Buffer.from(SVG))
  .png()
  .toFile(OUT)
  .then(() => console.log("flix.png  128x128"));
