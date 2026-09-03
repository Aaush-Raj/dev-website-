"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { caseStudy } from "@/content/case-study";
import { cn } from "@/lib/utils";

/**
 * CASE STUDY HERO
 * ---------------------------------------------------------------------------
 * The dark opening of the BFSI case study: a breadcrumb, the headline and
 * standfirst, the two scope figures, and the illustrative image.
 *
 * THE FIGURES CARRY A DISCLAIMER, and it sits directly beneath them rather
 * than in small print elsewhere. "25 branches / 9,328 conversations" describes
 * IMPLEMENTATION SCOPE, not a measured improvement — read without that
 * qualifier the two numbers would look like a performance claim. It is a
 * `<p>` in the normal flow for the same reason: it must be read.
 *
 * The type follows the site's own scale — `font-serif` (Playfair Display) for
 * the headline, `font-sans` for everything else — rather than the fonts the
 * supplied design file loads inline.
 */

const { breadcrumb, hero } = caseStudy;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CaseStudyHero() {
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

  return (
    <section
      className={cn(
        "bg-[#151515] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-16 sm:pt-32 lg:pt-32 lg:pb-20",
      )}
    >
      <Container width="content">
        {/* ========================= Breadcrumb ====================== */}
        <motion.nav
          {...rise(0)}
          aria-label="Breadcrumb"
          className="text-[0.8125rem]"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href={breadcrumb.parent.href}
                className={cn(
                  "text-brand-200",
                  "duration-normal transition-colors ease-out",
                  "hover:text-white",
                )}
              >
                {breadcrumb.parent.label}
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-600">
              /
            </li>
            <li aria-current="page" className="text-neutral-100">
              {breadcrumb.current}
            </li>
          </ol>
        </motion.nav>

        <div
          className={cn(
            "mt-10 grid gap-10",
            "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14",
            "lg:items-start",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0.06)}
              className={cn(
                "text-[0.75rem] font-medium tracking-[0.12em] uppercase",
                "text-brand-200",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.12)}
              className={cn(
                "mt-5 font-serif font-semibold tracking-[-0.01em]",
                "leading-[1.12] text-balance",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.125rem]",
              )}
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-300 sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* ------------------------ Figures ---------------------- */}
            <motion.dl {...rise(0.24)} className="mt-9 flex gap-10">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-serif text-[2.25rem] leading-none sm:text-[2.75rem]">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-[0.875rem] text-brand-200">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </motion.dl>

            {/*
              The qualifier. In the flow and readable, not tucked away: the
              two figures above describe scope, and without this they would
              read as a performance claim.
            */}
            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-5 max-w-[30rem] text-[0.8125rem] leading-relaxed",
                "text-neutral-500",
              )}
            >
              {hero.disclaimer}
            </motion.p>
          </div>

          {/* =========================== Image ======================== */}
          <motion.figure
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={1200}
              height={900}
              // The page's LCP image, so it must not lazy-load.
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
            <figcaption className="mt-3 text-[0.78125rem] text-neutral-500">
              {hero.image.caption}
            </figcaption>
          </motion.figure>
        </div>
      </Container>
    </section>
  );
}
