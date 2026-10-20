import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { ContactForm } from '@/components/ContactForm'
import { FacebookIcon, InstagramIcon } from '@/components/Icons'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Call, WhatsApp or message ${site.name}. Branches, opening hours and catering enquiries.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" sub="We'd love to hear from you." image="/img/table-spread.jpg" tone="light" />

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-2">
        <div data-reveal="up">
          <h2 className="text-[clamp(48px,5vw,64px)] leading-none">Get in touch</h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-body">Helpline</dt>
              <dd className="mt-1 text-ink">
                <a href={`tel:${site.helpline.replace(/\s/g, '')}`} className="hover:text-chili">
                  {site.helpline}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-body">Email</dt>
              <dd className="mt-1 break-all text-ink">
                <a href={`mailto:${site.email}`} className="hover:text-chili">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-body">Branches</dt>
              {site.branches.map((b) => (
                <dd key={b.slug} className="mt-1 text-ink">
                  <strong>{b.name}:</strong> {b.address}
                </dd>
              ))}
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-body">Opening hours</dt>
              <dd className="mt-1 text-ink">{site.hours}</dd>
            </div>
          </dl>
          <div className="mt-10 flex gap-3">
            <a href={site.instagram} aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-full bg-black/5 text-ink transition hover:bg-sun">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={site.facebook} aria-label="Facebook" className="grid h-12 w-12 place-items-center rounded-full bg-black/5 text-ink transition hover:bg-sun">
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div data-reveal="up" style={{ '--delay': '150ms' } as React.CSSProperties}>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
