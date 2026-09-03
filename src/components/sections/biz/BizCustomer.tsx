"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

import { bizCustomerIcons, ChevronIcon, MoreIcon } from "./BizIcons";

/**
 * BIZ CUSTOMER
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyBiz page: copy and three points on the left, a
 * photograph with a Customer 360 panel laid over it on the right.
 *
 * THE PANEL IS DRAWN, not the flat PNG supplied with the design — the same
 * choice sections 1 and 3 make, and for the same reasons: a baked export
 * cannot re-flow, its text is invisible to search, and it turns soft when
 * scaled.
 *
 * The AVATAR is the exception: it is a photograph, so it ships as an image
 * (extracted from that export) rather than being redrawn.
 *
 * A COPY FIX: the design labels the last card "Opportumitens". That is a typo
 * for "Opportunities", corrected in the content file. Shipping the misspelling
 * would put it in front of customers and into search results.
 *
 * The panel is wrapped in <Uncopyable> and aria-hidden: it imitates a product
 * screenshot. The heading, description and three points are real copy and sit
 * outside that wrapper.
 */

const { customer } = biz;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Shared chrome for a card inside the panel. */
const cardChrome = "rounded-xl bg-white ring-1 ring-neutral-200/80";

/** A card's header: a tinted glyph and its title. */
function CardHeader({
  icon,
  title,
  tone,
}: {
  icon: keyof typeof bizCustomerIcons;
  title: string;
  tone: string;
}) {
  const Icon = bizCustomerIcons[icon];

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-md",
          tone,
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <p className="text-[0.75rem] font-medium text-neutral-700">{title}</p>
    </div>
  );
}

export function BizCustomer() {
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

  const { panel } = customer;

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f3ec] py-section-lg text-neutral-900">
      {/*
        The photograph is a FULL-BLEED background, not an image framed in a
        grid column.

        Measured off the design: it runs the section's whole height from about
        37% across to the right edge. Framed in a column instead it was much
        shorter than the panel that overlays it, so the panel spilled out both
        ends — and `object-cover` on that short frame cropped the person out
        of shot entirely.

        Hidden below lg, where the copy and the panel stack and a background
        photo would sit behind both.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 -z-10 select-none",
          /*
            Capped near the photo's own 16:9 rather than stretched to the
            section's full height. Covering a much taller area zooms the crop
            in hard — centred or bottom-anchored, it landed on the top of the
            subject's head. At this ratio she stays in frame.
          */
          "hidden w-[64%] lg:block",
          "aspect-[16/10]",
        )}
      >
        <Image
          src={customer.scene.src}
          alt={customer.scene.alt}
          fill
          sizes="(min-width: 1024px) 64vw, 0px"
          className="object-cover object-center"
        />

        {/* Feathers the photo's left edge into the section's cream, so there
            is no hard seam beside the copy. */}
        <span
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(90deg,#f7f3ec_0%,rgb(247_243_236/0.55)_14%,transparent_34%)]",
          )}
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-10",
            "xl:gap-12",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
                "text-[#c17a32] sm:text-xs",
              )}
            >
              {customer.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-balance",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {customer.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[28rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {customer.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-10 space-y-7">
              {customer.points.map((point, index) => (
                <motion.li
                  key={point.label}
                  {...rise(0.24 + index * 0.08)}
                  className="group flex items-center gap-5"
                >
                  <Image
                    src={point.icon}
                    alt=""
                    aria-hidden="true"
                    width={128}
                    height={128}
                    className={cn(
                      "size-9 shrink-0 object-contain",
                      // `scale`, not `transform`: Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "duration-normal transition-[scale] ease-out",
                      "group-hover:scale-110",
                    )}
                  />

                  {/* The vertical rule the design sets between icon and
                      label. */}
                  <span
                    aria-hidden="true"
                    className="h-9 w-px shrink-0 bg-neutral-300"
                  />

                  <span className="text-[0.9375rem] text-pretty text-neutral-800 sm:text-base">
                    {point.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ======================== Showcase ======================== */}
          <motion.div
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
            className="relative"
          >
            {/*
              The photo and the panel are LOCKED TOGETHER: the photo fills
              this box absolutely and the panel sits in normal flow on top,
              so the box's height IS the panel's height and the photo is
              always exactly as tall as what it backs.

              Earlier attempts positioned the photo independently — first as a
              full-bleed section background, then as a capped-aspect layer.
              Both left the two out of step: the panel spilled past the photo,
              or the photo dropped away beneath it. Tying them removes the
              possibility.

              It bleeds left and right of the panel, as the design runs the
              photo wider than the card it hosts.
            */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -z-10 select-none",
                "hidden overflow-hidden rounded-2xl lg:block",
                "lg:-inset-x-[20%] lg:-inset-y-[7%]",
              )}
            >
              <Image
                src={customer.scene.src}
                alt={customer.scene.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 0px"
                className="object-cover object-center"
              />

              {/* Feathers the left edge into the section's cream, so there is
                  no hard seam beside the copy. */}
              <span
                className={cn(
                  "absolute inset-0",
                  "bg-[linear-gradient(90deg,#f7f3ec_0%,rgb(247_243_236/0.5)_18%,transparent_42%)]",
                )}
              />
            </div>

            {/* ------------------------ Panel ---------------------- */}
            <Uncopyable
              className={cn(
                "rounded-2xl bg-[#f5f3f1] p-3 shadow-xl ring-1 ring-black/5",
                /*
                  In normal flow, sitting in its own grid column over the
                  background photo — so the section's height is set by the
                  panel and the photo simply fills whatever that is. Pushed
                  right on lg to match the design's placement.
                */
                "lg:ml-auto lg:w-[92%] xl:w-[86%]",
              )}
            >
              <p className="px-1 pb-3 text-[0.9375rem] font-semibold">
                {panel.title}
              </p>

              {/* --------------------- Person ------------------- */}
              <div className={cn(cardChrome, "flex items-center gap-3 p-3")}>
                <Image
                  src={panel.person.avatar.src}
                  alt={panel.person.avatar.alt}
                  width={256}
                  height={256}
                  className="size-12 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-[0.9375rem] font-semibold">
                    {panel.person.name}
                  </p>
                  <p className="mt-0.5 text-[0.75rem] text-neutral-500">
                    {panel.person.since}
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 inline-flex items-center gap-1.5 rounded-md",
                      "bg-[#e8f4ec] px-2 py-0.5 text-[0.6875rem] font-medium",
                      "text-[#2f7d4f]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[#2f7d4f]"
                    />
                    {panel.person.status}
                  </p>
                </div>

                <MoreIcon className="size-4 shrink-0 text-neutral-400" />
              </div>

              {/* ------------------ Stats and lists -------------- */}
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                {/* Relationship. */}
                <div className={cn(cardChrome, "p-3")}>
                  <CardHeader
                    icon={panel.relationship.icon}
                    title={panel.relationship.title}
                    tone="bg-[#fdf0e2] text-[#c17a32]"
                  />
                  <dl className="mt-3 space-y-2">
                    {panel.relationship.rows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <dt className="text-[0.75rem] text-neutral-500">
                          {row.label}
                        </dt>
                        <dd className="text-[0.75rem] font-medium">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Products. */}
                <div className={cn(cardChrome, "p-3")}>
                  <CardHeader
                    icon={panel.products.icon}
                    title={panel.products.title}
                    tone="bg-[#fdece4] text-[#c25b32]"
                  />
                  <dl className="mt-3 space-y-2">
                    {panel.products.rows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <dt className="text-[0.75rem] text-neutral-600">
                          {row.label}
                        </dt>
                        <dd className="flex items-center gap-1 text-[0.75rem] font-medium">
                          {/* The masked digits the design draws as dots. */}
                          <span aria-hidden="true" className="text-neutral-400">
                            ••••
                          </span>
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Recent interactions. */}
                <div className={cn(cardChrome, "flex flex-col p-3")}>
                  <CardHeader
                    icon={panel.interactions.icon}
                    title={panel.interactions.title}
                    tone="bg-[#efe9fb] text-[#6b4bb8]"
                  />

                  <ul className="mt-3 flex-1 space-y-3">
                    {panel.interactions.items.map((item) => (
                      <li key={item.date}>
                        <p className="text-[0.75rem] font-medium">
                          {item.date}
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-neutral-700">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[0.6875rem] text-neutral-500">
                          {item.channel}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3.5 flex items-center justify-between text-[0.75rem] font-medium text-[#6b4bb8]">
                    {panel.interactions.action}
                    <ChevronIcon className="size-3.5" />
                  </p>
                </div>

                {/* Open commitments. */}
                <div className={cn(cardChrome, "flex flex-col p-3")}>
                  <CardHeader
                    icon={panel.commitments.icon}
                    title={panel.commitments.title}
                    tone="bg-[#e8f4ec] text-[#2f7d4f]"
                  />

                  <ul className="mt-3 flex-1 space-y-3">
                    {panel.commitments.items.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start justify-between gap-2"
                      >
                        <span className="min-w-0">
                          <span className="block text-[0.75rem] font-medium">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-[0.6875rem] text-neutral-500">
                            {item.due}
                          </span>
                        </span>

                        <span
                          className={cn(
                            "shrink-0 rounded-md bg-[#e8f4ec] px-2 py-0.5",
                            "text-[0.625rem] font-medium text-[#2f7d4f]",
                          )}
                        >
                          {item.status}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3.5 flex items-center justify-between text-[0.75rem] font-medium text-[#2f7d4f]">
                    {panel.commitments.action}
                    <ChevronIcon className="size-3.5" />
                  </p>
                </div>
              </div>

              {/* -------------------- Opportunity ---------------- */}
              <div className={cn(cardChrome, "mt-2.5 p-3")}>
                <CardHeader
                  icon={panel.opportunity.icon}
                  title={panel.opportunity.title}
                  tone="bg-[#eaf3e6] text-[#4f8a3c]"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] font-semibold">
                      {panel.opportunity.name}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] text-neutral-500">
                      {panel.opportunity.meta}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={cn(
                        "rounded-md bg-[#fdf0e2] px-2.5 py-1",
                        "text-[0.6875rem] font-medium text-[#c17a32]",
                      )}
                    >
                      {panel.opportunity.action}
                    </span>
                    <ChevronIcon className="size-3.5 text-neutral-400" />
                  </div>
                </div>
              </div>
            </Uncopyable>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
