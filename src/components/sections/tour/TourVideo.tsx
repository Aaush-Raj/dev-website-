"use client";

import { useState } from "react";

import { TourPoster } from "@/components/sections/tour/TourPoster";
import { tour } from "@/content/tour";
import { cn } from "@/lib/utils";

/**
 * TOUR VIDEO
 * ---------------------------------------------------------------------------
 * The product-tour video, embedded from YouTube behind the illustrated
 * capability-loop poster.
 *
 * FACADE, NOT A BARE IFRAME
 * The poster and play button are ours; the iframe is only mounted once
 * someone clicks. That matters for three reasons:
 *
 *   - An embedded player loads several hundred KB of YouTube JavaScript on
 *     every homepage visit, for a video most visitors never play.
 *   - It sets cookies and contacts Google before anyone has asked for a
 *     video, which is a consent problem in the EU and the GCC.
 *   - Nothing is requested from Google at all until the click, so the
 *     section paints immediately.
 *
 * `youtube-nocookie.com` is used for the same reason: no tracking cookie
 * until playback actually begins.
 *
 * THE POSTER IS THE ILLUSTRATION, NOT YOUTUBE'S THUMBNAIL. An earlier version
 * showed `i.ytimg.com/vi/<id>/maxresdefault.jpg`. The drawn poster is the
 * section's own artwork — it shows the capability loop the video describes,
 * it needs no third-party request, and it cannot break the way a missing
 * thumbnail size can.
 */

export function TourVideo({ className }: { className?: string }) {
  const { youTubeId, label } = tour.player;

  /** Only true once the reader has asked for the video. */
  const [playing, setPlaying] = useState(false);

  if (!youTubeId) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        /*
          THE BOX IS THE SAME SHAPE BEFORE AND AFTER THE CLICK, which is what
          stops the section resizing when someone presses play. The poster
          used to run 3.33:1 at desktop against the embed's 1.78:1, so a click
          grew the section by 304px and shoved the page below it down.

          From sm up that shape is 16:9, the player's own ratio.

          BELOW sm IT IS A FIXED HEIGHT instead. A 16:9 box is only 176px tall
          at 390px wide, and the poster there is a horizontal scroller whose
          cards are ~299px: scaling it to fit that height still leaves it
          651px wide, and scaling it to fit the WIDTH makes the cards 79px
          tall and unreadable. So the frame takes the scroller's height, and
          the iframe simply letterboxes inside it — the section still does not
          move.
        */
        "h-[19rem] sm:aspect-video sm:h-auto",
        "bg-[#04060f] ring-1 ring-white/10",
        className,
      )}
    >
      {playing ? (
        <iframe
          // autoplay is honoured because the click IS the user gesture.
          src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          /* `object-contain` keeps the video's own 16:9 inside the frame
             below sm, where the frame is taller than 16:9. */
          className="absolute inset-0 size-full border-0 object-contain"
        />
      ) : (
        /*
          The poster is CENTRED IN THE 16:9 FRAME rather than sizing it. It is
          a laid-out illustration whose own height is shorter than the
          player's, so it is placed in the middle of the frame with the
          backdrop filling the rest — which keeps the composition balanced
          instead of leaving the artwork stranded against the top edge.
        */
        <div className="group absolute inset-0">
          {/* A soft violet bloom behind the cards, so the frame reads as a
              designed surface rather than empty space around an
              illustration. */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-[radial-gradient(ellipse_at_center,var(--brand-800)_0%,transparent_65%)]",
              "opacity-50",
            )}
          />

          {/*
            SCALED TO FIT, NOT TO FILL. Measured at 1440: the frame is
            1159x652 and the poster's natural box is 1622x464 — WIDER than
            the frame, not shorter. Scaling up (my first attempt at 1.35)
            cropped the first and last cards off the sides, which breaks the
            one thing the poster is for: showing the chain end to end.

            0.9 measured out best: the card content is then 1014x306 in a
            1159x652 frame, leaving 72px side margins. 0.7 fitted but left
            185px of dead space either side; 1.0 pressed the outer cards to
            within 16px of the edge.

            `origin-center` with the grid centring above sits the chain in
            the middle of the 16:9 box.

            `scale` rather than a width change: the cards are laid out on a
            12-column grid with fixed vertical offsets, so scaling preserves
            those proportions instead of reflowing them.
          */}
          <span className="absolute inset-0 grid place-items-center overflow-hidden">
            {/* The poster's scroller has its own pb-4; inside this frame it
                is centred vertically instead, so that padding would push the
                cards off-centre. */}
            <TourPoster
              className={cn(
                "w-full origin-center px-4",
                /*
                  Natural size below sm, where the frame is sized to the
                  scroller rather than the other way round. From sm up the
                  frame is 16:9 and roomy enough to scale into: 0.9 at lg
                  measured out best, leaving 72px side margins on a
                  1159x652 frame.
                */
                "sm:scale-[0.8] md:scale-[0.85] lg:scale-[0.9]",
              )}
            />
          </span>

          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full cursor-pointer"
          >
            {/* A scrim so the play control keeps its contrast against the
                poster's cards. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 bg-[#04060f]/45",
                "transition-colors duration-500 group-hover:bg-[#04060f]/30",
              )}
            />

            {/* The play control. */}
            <span className="absolute inset-0 grid place-items-center">
              <span
                className={cn(
                  "grid size-[4.5rem] place-items-center rounded-full",
                  "bg-gradient-to-br from-brand-400 to-brand-700 text-white",
                  "ring-2 ring-white/85",
                  "shadow-[0_12px_34px_-8px_rgb(91_50_183/0.85)]",
                  "transition-[scale,box-shadow] duration-[380ms] ease-out",
                  "group-hover:scale-[1.07]",
                  "group-hover:shadow-[0_16px_44px_-8px_rgb(91_50_183/0.95)]",
                  "group-active:scale-100",
                  "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                )}
              >
                <PlayGlyph className="size-7 translate-x-0.5 drop-shadow-sm" />
              </span>
            </span>

            <span className="sr-only">{label}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/** The triangle on the play control. */
function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 5.2 19 12 8 18.8V5.2Z" />
    </svg>
  );
}
