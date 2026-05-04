import type { Metadata } from "next";

import { GhostText } from "@/components/background/GhostText";
import { SectionReveal } from "@/components/shared/SectionReveal";

const pageTitle = "Contact Ogwang Gift Gideon";
const pageDescription =
  "Start a conversation about your product, timeline, or platform goals with Ogwang Gift Gideon.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden pt-[96px]">
      <GhostText page="contact" />
      <SectionReveal
        as="section"
        className="w-full border-b border-[var(--color-border)]"
      >
        <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--space-3)] py-[var(--space-5)]">
          <div
            data-reveal-child
            className="mx-auto flex max-w-[65ch] flex-col items-center gap-[var(--space-4)] text-center"
          >
            <h1 className="text-[length:var(--text-headline-lg)] leading-[1.15]">
              Let&apos;s Talk
            </h1>
            <p className="text-[length:var(--text-body-lg)] text-[var(--color-text-secondary)]">
              Tell me about the product you are building, the timeline, and the
              outcome you want. I will reply with a clear next step.
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="w-full">
        <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--space-5)] py-[var(--space-8)]">
          <div
            data-reveal-child
            className="grid grid-cols-1 gap-[var(--space-7)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
          >
            <form
              className="flex flex-col gap-[var(--space-4)] border border-[var(--color-border)] p-[var(--space-5)]"
              method="post"
            >
              <div className="flex flex-col gap-[var(--space-2)]">
                <label
                  className="label text-[var(--color-text-secondary)]"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="w-full border-b-2 border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-green)] focus:text-[var(--color-text-primary)] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-[var(--space-2)]">
                <label
                  className="label text-[var(--color-text-secondary)]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                  className="w-full border-b-2 border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-green)] focus:text-[var(--color-text-primary)] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-[var(--space-2)]">
                <label
                  className="label text-[var(--color-text-secondary)]"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Project summary, goals, and constraints"
                  required
                  className="w-full border-b-2 border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-green)] focus:text-[var(--color-text-primary)] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="cta"
                className="label inline-flex w-fit items-center justify-center border border-transparent bg-[var(--color-amber)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-amber-dark)] hover:text-[var(--color-bg)]"
              >
                Send Message
              </button>
            </form>

            <div className="flex flex-col gap-[var(--space-4)]">
              <div className="flex flex-col gap-[var(--space-2)]">
                <p className="label text-[var(--color-text-secondary)]">Elsewhere</p>
                <ul className="flex flex-col gap-[var(--space-2)]">
                  <li>
                    <a
                      href="https://github.com/Gito125"
                      data-cursor="link"
                      className="flex items-center gap-[var(--space-3)] text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub — opens in new tab"
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.338 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.64.7 1.03 1.6 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/iamgideon125"
                      data-cursor="link"
                      className="flex items-center gap-[var(--space-3)] text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn — opens in new tab"
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5V24H0zM7.5 8h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7C23.7 7.5 24 12 24 16.8V24h-5v-6.8c0-1.6 0-3.6-2.2-3.6-2.2 0-2.6 1.8-2.6 3.5V24h-5V8z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/OgwangGift"
                      data-cursor="link"
                      className="flex items-center gap-[var(--space-3)] text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X (formerly Twitter) — opens in new tab"
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M22 5.92c-.66.29-1.37.48-2.11.57.76-.46 1.34-1.19 1.61-2.06-.71.42-1.5.72-2.34.88A3.65 3.65 0 0015.5 4c-2.02 0-3.65 1.62-3.65 3.62 0 .28.03.55.09.81C8.06 8.31 4.28 6.13 1.67 3.05c-.31.54-.49 1.18-.49 1.86 0 1.28.65 2.4 1.64 3.06-.6 0-1.17-.18-1.67-.46v.05c0 1.76 1.26 3.23 2.93 3.56-.31.08-.64.12-.98.12-.24 0-.48-.02-.71-.07.48 1.5 1.87 2.6 3.52 2.63A7.33 7.33 0 010 19.54a10.3 10.3 0 005.57 1.64c6.69 0 10.35-5.68 10.35-10.61v-.48c.72-.52 1.34-1.17 1.83-1.91-.66.3-1.36.51-2.09.6z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>X</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:iamgideon125@gmail.com"
                      data-cursor="link"
                      className="flex items-center gap-[var(--space-3)] text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      aria-label="Email — opens mail client"
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>iamgideon125@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="surface-hairline flex flex-col gap-[var(--space-2)] p-[var(--space-4)]">
                <p className="label text-[var(--color-text-secondary)]">Availability</p>
                <p className="text-[length:var(--text-body-md)] text-[var(--color-text-secondary)]">
                  Open to select product and platform collaborations with teams
                  building for scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
