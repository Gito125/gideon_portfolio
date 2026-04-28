import { SectionReveal } from "@/components/shared/SectionReveal";

export default function ContactPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden pt-[96px]">
      <SectionReveal
        as="section"
        className="w-full border-b border-[var(--color-border)]"
      >
        <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--space-5)] py-[var(--space-8)]">
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
                  className="w-full border-b border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] focus:border-[var(--color-text-primary)] focus:outline-none"
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
                  className="w-full border-b border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] focus:border-[var(--color-text-primary)] focus:outline-none"
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
                  className="w-full border-b border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] focus:border-[var(--color-text-primary)] focus:outline-none"
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
                      href="https://github.com/placeholder"
                      data-cursor="link"
                      className="text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/placeholder"
                      data-cursor="link"
                      className="text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/placeholder"
                      data-cursor="link"
                      className="text-[length:var(--text-body-md)] text-[var(--color-text-primary)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      X (Twitter)
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
