"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

import { ContactForm } from "./ContactForm";

/**
 * COMPANY CONTACT
 * ---------------------------------------------------------------------------
 * Section 3 of /company, and the last: the invitation and the stairs on the
 * left, the contact form on a white card to the right.
 *
 * TWO RASTERS, NOT ONE. The backdrop carries the lilac wash and the flowing
 * lines; the stairs ship separately with alpha, which is what lets them
 * arrive on their own rather than being baked into a ground that has to be
 * present from the start.
 *
 * THE CURSIVE NOTE IS DRAWN, NOT BAKED — and that is a correction, not a
 * preference. The supplied backdrop had "Your next step starts here" painted
 * into it, which looks right at exactly one viewport width and wrong at every
 * other: the backdrop is a full-viewport `object-cover` image that scales and
 * crops with the WINDOW, while the stairs are sized to their grid COLUMN. The
 * two cannot track each other. So the note was painted out of the raster and
 * is drawn beside the stairs inside their own box, positioned as a percentage
 * of it — which is what makes the pair hold together from a phone to a 2560px
 * desktop.
 *
 * THE STAIRS CLIMB, they do not fade. They are a picture of progress, so
 * treating them as one flat image that appears would waste what they depict.
 * Instead the whole object rises from below-left while the sphere on its top
 * step settles a beat later — the sphere is masked as its own layer, cropped
 * from the same raster, so it can land after the steps it rests on. That
 * ordering is the point: steps first, then the thing that reached the top.
 *
 * THEY ANIMATE IN VIEW, not on mount. This section is at the foot of a long
 * page, so a mount trigger would play the whole sequence while it is still
 * far below the fold and be over before anyone saw it.
 *
 * BELOW LG the backdrop drops out and a flat lilac ground carries the section,
 * since a 3:2 wash has nothing useful to show at that crop. The stairs stay:
 * now that the note travels with them they simply scale down together, and
 * they are the only piece of art this section has.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { contact } = company;

export function CompanyContact() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  /**
   * The stairs' two beats. Under prefers-reduced-motion both collapse to
   * zero, so the object is simply present rather than arriving late.
   */
  const stairsBeat = reduce
    ? { steps: 0, sphere: 0, note: 0 }
    : { steps: 0.1, sphere: 0.55, note: 0.9 };

  return (
    <section className="relative overflow-hidden bg-[#f1e7fe]">
      {/* --------------------------- Backdrop --------------------------- */}
      {/* Carries the wash, the flowing lines and the cursive annotation. */}
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <Image
          src={contact.backdrop.src}
          alt={contact.backdrop.alt}
          fill
          sizes="100vw"
          className="object-cover object-left-bottom"
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "py-20 sm:py-24 lg:py-28 xl:py-32",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16",
          )}
        >
          {/* =========================== Invitation ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.2em] uppercase",
                "text-[#7805cf] sm:text-xs",
              )}
            >
              {contact.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.06] text-neutral-900",
                // Measured from the design at ~66px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.5rem]",
              )}
            >
              {contact.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#440f75] sm:text-[1.0625rem]",
              )}
            >
              {contact.description}
            </motion.p>

            {/* --------------------------- Stairs --------------------- */}
            {/*
              THE STAIRS AND THEIR NOTE SHARE ONE BOX, and that is the whole
              point of this wrapper.

              The note used to be baked into the backdrop, which is a
              full-viewport `object-cover` image — so it scaled and cropped
              with the WINDOW while the stairs scaled with their COLUMN. Two
              coordinate systems will align at exactly one width and drift
              apart at every other, which is what went wrong on large
              desktops. Now both sit in this box, positioned as percentages
              of it, so the note points at the sphere identically at 1024px
              and at 2560px.

              The box itself is fluid rather than clamped to one size: it
              takes its width from the column and caps with a viewport-aware
              clamp, so it grows on a wide screen instead of stranding the
              art in a corner.

              IT NOW SHOWS AT EVERY WIDTH, including phones. It was hidden
              below lg only because the note was stranded in the backdrop and
              would not have followed; with the two together the pair simply
              scales down, and the stairs are the one piece of art this
              section has.
            */}
            <div
              aria-hidden="true"
              className={cn(
                "relative mt-10 block",
                // 3:2 matches the raster, so `object-contain` fills the box
                // exactly and the sphere clip below stays true.
                "aspect-[3/2]",
                // Caps against the viewport on phones and against the column
                // on desktops, so it is never wider than the copy above it.
                "w-full max-w-[clamp(17rem,26vw,32rem)]",
              )}
            >
              {/*
                The steps. They rise from below-left, which is the direction
                the object is climbing.
              */}
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: { opacity: 0, x: -26, y: 34 },
                  shown: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 0.85,
                      delay: stairsBeat.steps,
                      ease: easeOut,
                    },
                  },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={contact.stairs.src}
                  alt={contact.stairs.alt}
                  fill
                  sizes="(min-width: 1024px) 32rem, (min-width: 640px) 24rem, 17rem"
                  className="object-contain object-left-bottom"
                />
              </motion.div>

              {/*
                The sphere, landing on the top step a beat later.

                It is the SAME raster, clipped to the sphere's corner of the
                frame and offset to undo the clip — so there is no second
                asset to keep in sync, and the two layers cannot drift apart
                if the image is ever re-exported. It drops in from above,
                which is how a thing comes to rest on a step.
              */}
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: { opacity: 0, y: -22, scale: 0.88 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: stairsBeat.sphere,
                      ease: easeOut,
                    },
                  },
                }}
                className={cn(
                  "absolute inset-0",
                  /*
                   * The sphere's window, MEASURED from the raster's alpha
                   * channel (x 995-1210, y 112-310 of 1536x1024) rather
                   * than eyeballed. The source is 3:2 and the box is 3:2,
                   * so `object-contain` fills it exactly and the source's
                   * percentages are the box's.
                   */
                  "[clip-path:inset(11%_21%_70%_65%)]",
                )}
              >
                <Image
                  src={contact.stairs.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 32rem, (min-width: 640px) 24rem, 17rem"
                  className="object-contain object-left-bottom"
                />
              </motion.div>

              {/*
                The note, and the hook that points at the sphere.

                Both are positioned as PERCENTAGES OF THIS BOX, the same box
                the stairs fill — so the hook's tip stays on the sphere at
                every width. The sphere's own centre sits at about 72% across
                and 20% down (from the raster's alpha bounds), which is what
                the hook curves toward and the text sits beside.

                It arrives last, after the sphere has landed: the note is a
                remark about what happened, so it should not precede it.
              */}
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: stairsBeat.note,
                      ease: easeOut,
                    },
                  },
                }}
                className="absolute inset-0"
              >
                {/* The hook, drawn in the box's own coordinate space so it
                    scales with everything else rather than at a fixed px. */}
                <svg
                  viewBox="0 0 300 200"
                  className="absolute inset-0 size-full"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M243 34c-14-9-28-6-33 6"
                    stroke="#7805cf"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <p
                  className={cn(
                    "absolute top-[2%] left-[76%]",
                    "font-hand leading-[1.15] text-[#7805cf]",
                    // Scales with the box rather than stepping at
                    // breakpoints, so it never outgrows the art.
                    "text-[clamp(0.9375rem,1.5vw,1.375rem)]",
                  )}
                >
                  {contact.annotation.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </motion.div>
            </div>

            {/* ------------------------ Company ---------------------- */}
            <motion.div {...rise(0.24)} className="mt-10 lg:mt-12">
              <p className="text-[0.9375rem] font-semibold text-[#440f75]">
                {contact.company.name}
              </p>
              <p className="mt-1 text-[0.875rem] text-[#6b4a94]">
                {contact.company.offices}
              </p>
            </motion.div>
          </div>

          {/* ============================= Form ======================== */}
          <motion.div {...rise(0.2)}>
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
