import Image from "next/image";
import Link from "next/link";

const heroStats = ["1 Live Product", "2 Universities", "Uganda -> World"];

export function HeroSection() {
  return (
    <section className="w-full bg-[var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-7)] px-[var(--space-5)] py-[var(--space-8)]">
        <div className="grid w-full gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="flex flex-col gap-[var(--space-4)]">
            <h1 className="text-[length:var(--text-display)] leading-[1.05] tracking-[-0.03em]">
              <span className="underline decoration-[var(--color-amber)] decoration-2 underline-offset-[var(--space-2)]">
                Ogwang Gift Gideon
              </span>
            </h1>
            <p className="font-[var(--font-display-family)] text-[length:var(--text-headline-md)] italic text-[var(--color-text-secondary)]">
              Full-Stack Developer &amp; Product Builder
            </p>
            <p className="text-[length:var(--text-body-lg)] text-[var(--color-text-secondary)]">
              Building modern platforms with clarity, speed, and care.
            </p>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              <Link
                className="label inline-flex items-center justify-center border border-transparent bg-[var(--color-amber)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-amber-dark)] hover:text-[var(--color-bg)]"
                href="/projects"
              >
                See My Work
              </Link>
              <Link
                className="label inline-flex items-center justify-center border border-[var(--color-green)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-green)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-green-light)]"
                href="/contact"
              >
                Let&apos;s Talk
              </Link>
            </div>
            <ul className="flex flex-wrap gap-[var(--space-2)]">
              {heroStats.map((stat) => (
                <li
                  key={stat}
                  className="label border border-[var(--color-border)] px-[var(--space-2)] py-[var(--space-1)] text-[var(--color-text-secondary)]"
                >
                  {stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/hero-placeholder.svg"
                alt="Portrait of Ogwang Gift Gideon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
