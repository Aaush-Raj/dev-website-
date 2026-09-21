"use client";

import { useState } from "react";

import { tour } from "@/content/tour";
import { cn } from "@/lib/utils";

/**
 * TOUR VIDEO
 * ---------------------------------------------------------------------------
 * The product-tour video, embedded from YouTube.
 *
 * FACADE, NOT A BARE IFRAME
 * The thumbnail and play button are ours; the iframe is only mounted once
 * someone clicks. That matters for three reasons:
 *
 *   - An embedded player loads several hundred KB of YouTube JavaScript on
 *     every homepage visit, for a video most visitors never play.
 *   - It sets cookies and contacts Google before anyone has asked for a
 *     video, which is a consent problem in the EU and the GCC.
 *   - The thumbnail is one image request, so the section paints immediately.
 *
 * `youtube-nocookie.com` is used for the same reason: no tracking cookie
 * until playback actually begins.
 *
 * The thumbnail comes from YouTube's own image host. `maxresdefault` exists
 * for most uploads but not all, so `hqdefault` is the fallback — it is always
 * present, which is what stops a broken image if the former is missing.
 */

/** Poster sizes YouTube serves, best first. */
const THUMBNAIL = (id: string, quality: "maxres" | "hq") =>
  `https://i.ytimg.com/vi/${id}/${quality}default.jpg`;

export function TourVideo({ className }: { className?: string }) {
  const { youTubeId, label } = tour.player;

  /** Only true once the reader has asked for the video. */
  const [playing, setPlaying] = useState(false);
  /** Falls back to hqdefault when maxres is missing for this upload. */
  const [quality, setQuality] = useState<"maxres" | "hq">("maxres");

  if (!youTubeId) return null;

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl",
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
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {/*
            A plain <img>, not next/image: the src is a third-party host and
            this build runs with `images.unoptimized`, so next/image would add
            a wrapper for no benefit. `eager` because it is the section's
            visual subject.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={THUMBNAIL(youTubeId, quality)}
            alt=""
            aria-hidden="true"
            loading="eager"
            onError={() => setQuality("hq")}
            className={cn(
              "size-full object-cover",
              "transition-[scale,opacity] duration-500 ease-out",
              "group-hover:scale-[1.02] group-hover:opacity-95",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            )}
          />

          {/* Darkens the thumbnail so the play control keeps its contrast
              whatever the frame happens to be. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#04060f]/25 transition-colors duration-500 group-hover:bg-[#04060f]/15"
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
