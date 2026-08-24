import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { chat } from "@/content/chat";

/**
 * CHAT PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyChat page.
 *
 * The layout is the shared ProblemSection, which the LurnyPitch and LurnyPulse
 * pages use too — the designs are identical apart from the copy. Everything
 * specific to this page lives in content/chat.ts.
 *
 * No `nowrapHeadline` here: this headline's lines are short enough to hold at
 * xl on their own, and forcing them would only risk overflow.
 */

export function ChatProblem() {
  return <ProblemSection content={chat.problem} />;
}
