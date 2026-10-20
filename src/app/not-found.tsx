import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[70vh] place-items-center pt-[110px] text-center">
      <div>
        <p className="offset-shadow font-display text-[140px] leading-none text-ink">404</p>
        <p className="eyebrow-script text-5xl">Oops</p>
        <p className="mt-2">This plate&apos;s empty. Let&apos;s get you back to the food.</p>
        <Link href="/menu" className="btn-sun mt-8">
          See the menu
        </Link>
      </div>
    </section>
  )
}
