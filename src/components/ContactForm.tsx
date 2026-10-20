'use client'

import { WhatsAppIcon } from './Icons'
import { site } from '@/lib/site'

const subjects = ['General enquiry', 'Catering / large order', 'Feedback on an order', 'Events & lounge bookings', 'Partnerships']

/** No backend yet: the form composes a WhatsApp message to the main branch. TODO: wire to email (e.g. Resend) if wanted. */
export function ContactForm() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const text = [`${f.get('subject')}`, `From: ${f.get('name')} (${f.get('email')})`, '', `${f.get('message') || ''}`].join('\n')
    window.open(`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const field = 'mt-1.5 w-full border border-black/40 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-sun focus:ring-2 focus:ring-sun/40'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          Email address
          <input name="email" type="email" required autoComplete="email" placeholder="you@mail.com" className={field} />
        </label>
        <label className="block text-sm">
          Full name
          <input name="name" required autoComplete="name" placeholder="e.g. Ada Obi" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        Subject
        <select name="subject" className={field} defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Your message
        <textarea name="message" rows={5} className={field} />
      </label>
      <button type="submit" className="inline-flex items-center gap-2 bg-sun px-9 py-4 font-semibold text-ink transition hover:bg-ink hover:text-sun">
        <WhatsAppIcon className="h-5 w-5" /> Send message
      </button>
    </form>
  )
}
