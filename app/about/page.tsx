import Image from "next/image";
import Link from "next/link";

import { stackGroups } from "@/data/stack";

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="w-full bg-[var(--color-bg)]">
        <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-7)] px-[var(--space-5)] py-[var(--space-8)]">
          <div className="grid w-full gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="flex flex-col gap-[var(--space-4)]">
              <h1 className="text-[length:var(--text-headline-lg)] leading-[1.15]">
                About
              </h1>
              <p className="text-[length:var(--text-body-lg)] text-[var(--color-text-secondary)]">
                I build products that turn complex workflows into clear, reliable
                experiences. My flagship product Acadex helps schools run
                operations with confidence. I am focused on shipping globally
                ambitious systems from Uganda.
              </p>
              <div className="flex flex-wrap gap-[var(--space-3)]">
                <Link
                  href="/cv/Ogwang_Gift_Gideon_CV.pdf"
                  download
                  className="label inline-flex items-center justify-center border border-[var(--color-green)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-green)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-green-light)]"
                >
                  Download CV
                </Link>
              </div>
            </div>
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/hero-placeholder.svg"
                  alt="Ogwang Gift Gideon portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-6)] px-[var(--space-5)] py-[var(--space-8)]">
          <h2 className="text-[length:var(--text-headline-md)] leading-[1.25]">
            Stack
          </h2>
          <div className="grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-4">
            {stackGroups.map((group) => (
              <article
                key={group.title}
                className="surface-hairline flex h-full flex-col gap-[var(--space-3)] p-[var(--space-4)]"
              >
                <h3 className="text-[length:var(--text-body-lg)] font-[var(--font-display-family)]">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-[var(--space-2)]">
                  {group.items.map((item) => (
                    <span key={item} className="stack-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
