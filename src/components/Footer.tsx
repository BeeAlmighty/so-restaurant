import Link from 'next/link'
import { Logo } from './Logo'
import { FacebookIcon, InstagramIcon, PhoneIcon } from './Icons'
import { site } from '@/lib/site'

export function Locations() {
  return (
    <section aria-labelledby="branches" className="container-x py-16 md:py-20">
      <h2 id="branches" className="sr-only">
        Our branches
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {site.branches.map((b, i) => (
          <div key={b.slug} data-reveal="up" style={{ '--delay': `${i * 120}ms` } as React.CSSProperties}>
            <h3 className="text-3xl">{b.name}</h3>
            <p className="mt-2 text-sm leading-6">{b.address}</p>
            <p className="mt-2 text-sm leading-6">
              Call{' '}
              <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="font-semibold text-ink hover:text-chili">
                {b.phone}
              </a>
              <br />
              WhatsApp{' '}
              <a href={`https://wa.me/${b.whatsapp}`} className="font-semibold text-ink hover:text-chili">
                +{b.whatsapp}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="speckle text-white/70">
      <div className="container-x grid items-center gap-10 py-14 text-center md:grid-cols-3 md:text-left">
        <a href={`tel:${site.helpline.replace(/\s/g, '')}`} className="group flex items-center justify-center gap-4 md:justify-start">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink transition group-hover:scale-110">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase text-white">Our helpline</span>
            <span className="block font-display text-3xl tracking-wide text-white">{site.helpline}</span>
          </span>
        </a>

        <Link href="/" className="justify-self-center" aria-label={`${site.name} home`}>
          <Logo light />
        </Link>

        <div className="md:justify-self-end">
          <p className="font-display text-xl tracking-[0.15em] text-white">Get in touch</p>
          <a href={`mailto:${site.email}`} className="mt-2 block break-all text-sun hover:underline">
            {site.email}
          </a>
          <p className="mt-1 text-sm">{site.hours}</p>
          <div className="mt-4 flex justify-center gap-3 md:justify-start">
            <a href={site.facebook} aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-sun hover:text-ink">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href={site.instagram} aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-sun hover:text-ink">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="container-x border-t border-white/10 py-6 text-center text-sm">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
