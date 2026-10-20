/**
 * Everything brand-specific lives here. Anything marked TODO is a placeholder
 * that must be replaced with SO Restaurant's real details before launch.
 */

export type Branch = {
  slug: string
  name: string
  address: string
  phone: string
  /** International format, digits only, e.g. 2348012345678 */
  whatsapp: string
}

export type Testimonial = {
  quote: string
  name: string
  /** true = sample copy, not a real customer. Rendered with a visible "sample" tag. */
  placeholder?: boolean
}

export const site = {
  name: 'SO Restaurant',
  shortName: 'SO',
  url: 'https://so-restaurant.com', // TODO: real domain
  tagline: 'A taste of so good',
  description:
    'SO Restaurant serves rich Nigerian classics, grills, burgers and cocktails, cooked fresh and delivered fast. Order on WhatsApp in minutes.',
  hours: 'Open daily, 8am – 11pm', // TODO: confirm opening hours
  email: 'hello@so-restaurant.com', // TODO
  helpline: '0800 000 0000', // TODO
  instagram: 'https://instagram.com/', // TODO
  facebook: 'https://facebook.com/', // TODO
  city: 'Lagos',
  branches: [
    // TODO: real branches, addresses and numbers
    { slug: 'lekki', name: 'Lekki', address: 'Street address to confirm, Lekki, Lagos', phone: '0800 000 0001', whatsapp: '2348000000001' },
    { slug: 'ikeja', name: 'Ikeja', address: 'Street address to confirm, Ikeja, Lagos', phone: '0800 000 0002', whatsapp: '2348000000002' },
    { slug: 'vi', name: 'Victoria Island', address: 'Street address to confirm, VI, Lagos', phone: '0800 000 0003', whatsapp: '2348000000003' },
  ] satisfies Branch[],
  testimonials: [
    // TODO: swap for real Google/Instagram reviews (with permission) and drop `placeholder`.
    { quote: 'The jollof tastes like a Sunday party, and it got to my office still hot.', name: 'Sample review', placeholder: true },
    { quote: 'Great grills, great cocktails, and the staff remember your order.', name: 'Sample review', placeholder: true },
    { quote: 'My go-to after late meetings. The pepper soup alone is worth the drive.', name: 'Sample review', placeholder: true },
  ] satisfies Testimonial[],
}

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/menu', label: 'Order' },
  { href: '/lounge', label: 'Lounge menu' },
  { href: '/contact', label: 'Contact us' },
]
