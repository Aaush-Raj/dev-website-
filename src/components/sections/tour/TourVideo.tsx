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
        // 16:9 only while the iframe is mounted. The poster is a laid-out
        // illustration with its own height, and forcing it into 16:9 would
        // crop the card chain it exists to show.
        playing && "aspect-video",
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
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        /*
          THE POSTER SIZES THE BOX, so it sits in normal flow rather than
          being absolutely positioned: it is a laid-out illustration with its
          own height, and an absolute poster inside a container with no
          intrinsic height collapsed the whole player to nothing.

          The button is the overlay on top of it.
        */
        <div className="group relative">
          <TourPoster className="relative" />

          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full cursor-pointer"
          >
            {/* A light scrim so the play control keeps its contrast against
                the poster's cards. */}
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
