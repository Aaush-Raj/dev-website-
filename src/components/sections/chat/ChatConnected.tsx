"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

import { ChatConnectedDashboard } from "./ChatConnectedDashboard";

/**
 * CHAT CONNECTED
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyChat page: "one conversational layer". The statement on
 * the left, a drawn simulation-results dashboard on the right, on a near-black
 * ground with a soft violet glow.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { connected } = chat;

export function ChatConnected() {
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
        "relative isolate overflow-hidden bg-[#050308] py-section-lg text-white",
      )}
    >
      {/* Soft violet glow off the left, behind the statement. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40rem 34rem at 6% 34%, rgb(88 40 180 / 0.35), transparent 60%)",
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The dashboard is dense, so it takes the larger share of the row.
            "lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-300 sm:text-xs",
              )}
            >
              {connected.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08]",
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {connected.headline.map((word, i) => (
                <span
                  key={`${word.text}-${i}`}
                  className={word.accent ? "text-brand-400" : "text-white"}
                >
                  {word.text}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-100 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {connected.description}
            </motion.p>
          </div>

          {/* ========================= Dashboard ======================= */}
          <ChatConnectedDashboard />
        </div>
      </Container>
    </section>
  );
}
