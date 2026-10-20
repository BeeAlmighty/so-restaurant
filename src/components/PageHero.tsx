import Image from 'next/image'

/** Photo banner used on inner pages: dark wash + big display title, like the reference's About/Contact heroes. */
export function PageHero({ title, sub, image, tone = 'dark' }: { title: string; sub: string; image: string; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  return (
    <section className="relative grid min-h-[420px] place-items-center overflow-hidden pt-[72px] md:min-h-[540px]">
      <Image src={image} alt="" fill priority sizes="100vw" className="scale-105 object-cover" />
      <div className={`absolute inset-0 ${dark ? 'bg-ink/70' : 'bg-white/65'}`} />
      <div className="relative px-4 text-center">
        <h1 data-reveal="up" className={`text-[clamp(64px,9vw,120px)] leading-none ${dark ? 'text-white' : 'offset-shadow text-ink'}`}>
          {title}
        </h1>
        <p data-reveal="up" style={{ '--delay': '150ms' } as React.CSSProperties} className={`mt-3 text-base font-medium ${dark ? 'text-white/85' : 'text-ink/80'}`}>
          {sub}
        </p>
      </div>
    </section>
  )
}
