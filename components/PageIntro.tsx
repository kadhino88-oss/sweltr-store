export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-[#F5F7FB]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-gold/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-strong">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#D9DEE7] md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
