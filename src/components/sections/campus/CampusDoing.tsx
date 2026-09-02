"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { CampusArtefact } from "./CampusArtefact";
import {
  CertificateIcon,
  CheckBadgeIcon,
  doingIcons,
  MilestoneCurrentIcon,
  MilestoneDoneIcon,
} from "./CampusIcons";

/**
 * CAMPUS — LEARN BY DOING
 * ---------------------------------------------------------------------------
 * Section 4: the claim on the left, a project workspace on the right with the
 * mentor's verdict and the evidence it produced floating off its edge.
 *
 * THE FLOATING CARDS
 * The design overlaps the mentor and evidence cards onto the project card's
 * right edge, joined to it by dashed connectors. That overlap only works when
 * there is room for it, so above lg the two cards sit in their own column with
 * the connectors drawn between; below lg they fall into the ordinary flow
 * beneath the project card and the connectors are dropped, since there is no
 * longer a gap for them to span.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { doing } = campus;

export function CampusDoing() {
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
    <section className="relative isolate overflow-hidden bg-[#fefbfa] py-20 lg:py-28">
      {/* The faint arcs the design sets in the far corners. Decorative. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -top-10 -right-10 -z-10 hidden size-80 lg:block"
      >
        {[70, 88, 106, 124].map((r) => (
          <circle
            key={r}
            cx="150"
            cy="50"
            r={r}
            fill="none"
            stroke="rgb(220 150 120 / 0.16)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the design: the copy runs to roughly 34% of the
            // frame, the workspace takes the rest.
            "lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ========================== The claim ====================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#f24535] sm:text-[0.8125rem]",
              )}
            >
              {doing.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-[#0b1a22]",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {doing.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative, so
                      hidden rather than announced as a stray glyph. */}
                  {index === doing.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#f24535]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#3f5158] sm:text-[1.0625rem]",
              )}
            >
              {doing.description}
            </motion.p>

            {/* ------------------------ The points -------------------- */}
            <ul className="mt-10 space-y-8 lg:mt-12">
              {doing.points.map((point, index) => {
                const Icon = doingIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.24 + index * 0.1)}
                    className="group/pt flex items-start gap-5"
                  >
                    <span
                      className={cn(
                        "shrink-0 text-[#0d4d4d]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/pt:scale-108",
                      )}
                    >
                      <Icon className="size-11" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] font-bold text-pretty text-[#0d4d4d]">
                        {point.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4a5a60]">
                        {point.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ======================= The workspace ===================== */}
          <div
            className={cn(
              "relative grid grid-cols-1 gap-6",
              // The project card and the floating pair, side by side. The
              // right column is narrower: it holds cards, not a workspace.
              "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-center lg:gap-0",
            )}
          >
            {/* ---------------------- Project card ------------------- */}
            <motion.div
              {...rise(0.2)}
              // A mockup, not a live view: see the note in CampusHome.
              aria-hidden="true"
              className={cn(
                "relative z-10 rounded-2xl bg-white p-5 sm:p-6",
                "ring-1 ring-black/6",
                "shadow-[0_30px_70px_-32px_rgb(11_47_51/0.45)]",
              )}
            >
              {/* The product wordmark. */}
              <span className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-[#ef5b34] font-display text-[1.125rem] font-bold text-white">
                  L
                </span>
                <span className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[#0d5451]">
                  {doing.project.brand}
                </span>
              </span>

              {/* Role, term, and the "you are here" marker. */}
              <span className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.875rem] text-[#3f5158]">
                <span>{doing.project.role}</span>
                <span aria-hidden="true" className="text-[#b9c4c6]">
                  ·
                </span>
                <span>{doing.project.term}</span>
                <span className="rounded-full bg-[#f54335] px-3 py-1 text-[0.625rem] font-bold tracking-[0.08em] text-white uppercase">
                  {doing.project.here}
                </span>
              </span>

              <span className="mt-5 block border-t border-[#eeebe7]" />

              {/* The brief. */}
              <span className="mt-5 block font-display text-[1.25rem] leading-snug font-bold text-pretty text-[#0b1a22] sm:text-[1.4375rem]">
                {doing.project.title}
              </span>

              <span className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#fdf0dc] px-2.5 py-1 text-[0.75rem] font-semibold text-[#c45713]">
                  {doing.project.status}
                </span>
              </span>

              <span className="mt-3 flex flex-wrap items-center gap-2">
                {doing.project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-[#e2f1ec] px-2.5 py-1.5 text-[0.75rem] font-medium text-[#0d5451]"
                  >
                    {skill}
                  </span>
                ))}
              </span>

              <span className="mt-5 block border-t border-[#eeebe7]" />

              {/* ------------------- Progress + artefact ------------- */}
              <span className="mt-5 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#7c8a8e] uppercase">
                {doing.project.progressTitle}
              </span>

              <span className="mt-4 grid gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:gap-5">
                {/* The milestone spine. */}
                <span className="block">
                  {doing.project.milestones.map((milestone, index) => {
                    const done = milestone.state === "done";
                    const last = index === doing.project.milestones.length - 1;

                    return (
                      <motion.span
                        key={milestone.label}
                        {...rise(0.4 + index * 0.12)}
                        className={cn(
                          "relative flex gap-3.5 pb-6",
                          // The connecting line runs BETWEEN marks, so it is a
                          // left border on all but the last row.
                          !last && "border-l-2 border-[#cfe0dd]",
                          "ml-3 pl-6",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0 -left-[0.8125rem] grid size-6.5",
                            "place-items-center rounded-full bg-white",
                            "text-[#0d5451]",
                          )}
                        >
                          {done ? (
                            <MilestoneDoneIcon className="size-6.5" />
                          ) : (
                            <MilestoneCurrentIcon className="size-6.5" />
                          )}
                        </span>

                        <span className="-mt-0.5 block min-w-0">
                          <span className="block text-[0.875rem] font-semibold text-pretty text-[#0b1a22]">
                            {milestone.label}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block text-[0.8125rem]",
                              done ? "text-[#7c8a8e]" : "text-[#0d5451]",
                            )}
                          >
                            {milestone.note}
                          </span>
                        </span>
                      </motion.span>
                    );
                  })}
                </span>

                {/* The artefact preview. */}
                <motion.span {...rise(0.55)} className="block">
                  <CampusArtefact />
                </motion.span>
              </span>
            </motion.div>

            {/* ------------------- The floating pair ----------------- */}
            {/*
              Pulled left over the project card's edge on lg+, which is what
              gives the design its overlap. Below lg they simply stack.
            */}
            <div className="relative z-20 space-y-5 lg:-ml-6">
              {/* ....................... Mentor ..................... */}
              <motion.div
                {...rise(0.5)}
                className={cn(
                  "rounded-2xl bg-white p-5",
                  "ring-1 ring-black/6",
                  "shadow-[0_24px_50px_-28px_rgb(11_47_51/0.5)]",
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Image
                    src={doing.mentor.avatar.src}
                    alt={doing.mentor.avatar.alt}
                    width={doing.mentor.avatar.width}
                    height={doing.mentor.avatar.height}
                    className="size-12 shrink-0 rounded-full bg-[#f0ece8] object-cover"
                  />

                  <p className="min-w-0">
                    <span className="block text-[1rem] font-bold text-[#0b1a22]">
                      {doing.mentor.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-[#4a5a60]">
                      {doing.mentor.role}
                    </span>
                  </p>
                </div>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-[#3f5158]">
                  {doing.mentor.quote}
                </p>

                <p className="mt-4">
                  <span className="inline-block rounded-md bg-[#dcefe7] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#04635b]">
                    {doing.mentor.badge}
                  </span>
                </p>
              </motion.div>

              {/* ...................... Evidence .................... */}
              <motion.div
                {...rise(0.62)}
                className={cn(
                  "rounded-2xl bg-white p-5",
                  "border-2 border-[#f7a794]",
                  "shadow-[0_24px_50px_-28px_rgb(242_69_53/0.45)]",
                )}
              >
                <p className="flex items-center gap-2.5">
                  <CertificateIcon className="size-7 shrink-0 text-[#f04a39]" />
                  <span className="text-[0.8125rem] font-bold tracking-[0.08em] text-[#f04a39] uppercase">
                    {doing.evidence.title}
                  </span>
                </p>

                <span className="mt-4 block border-t border-[#f2ede9]" />

                <ul className="mt-4 space-y-3">
                  {doing.evidence.items.map((item, index) => (
                    <motion.li
                      key={item}
                      {...rise(0.7 + index * 0.08)}
                      className="flex items-center gap-3"
                    >
                      <CheckBadgeIcon className="size-5 shrink-0 text-[#f04a39]" />
                      <span className="text-[0.9375rem] text-[#0b1a22]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
