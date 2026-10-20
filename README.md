# SO Restaurant

Marketing site + online menu with WhatsApp ordering. Styled after the eatwithmimi.com teardown (`../eatwithmimi-teardown/NOTES.md`). It uses the same layout language but its own fonts, photos, copy and code.

Next 16 · React 19 · Tailwind v4 · no backend, no keys needed.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
|---|---|
| Brand details: name, phones, WhatsApp numbers, branches, hours, socials, reviews | `src/lib/site.ts` |
| Food menu (categories, items, options, prices) and lounge drinks list | `src/lib/menu.ts` |
| Colours, fonts, animations | `src/app/globals.css` (`@theme` block) |
| Hero slider (rings, offset headline, parallax, slide timeline) | `src/components/Hero.tsx` |
| Cart store (localStorage) and WhatsApp checkout | `src/lib/cart.ts`, `src/components/CartDrawer.tsx` |
| Photos | `public/img/` (Unsplash, free licence, served as static files) |

## How ordering works
1. The customer adds items on `/menu`. Items with options open a picker.
2. The cart drawer collects delivery or pickup, branch, name, phone and address.
3. "Send order on WhatsApp" opens `wa.me/<branch number>` with the order pre-written.

There is no payment step yet. Paystack can be added later in the same way as Geesjo / store-template.

## Before launch: TODO
- [ ] **Real details in `src/lib/site.ts`:** domain, helpline, email, branch addresses, **WhatsApp numbers** (currently `23480000000xx` placeholders, so orders go nowhere), hours, Instagram/Facebook.
- [ ] **Reviews:** replace the 3 sample testimonials with real ones (with permission) and remove `placeholder: true`. Until then they show a visible "sample" tag.
- [ ] **Prices and dishes** in `src/lib/menu.ts`: all prices are placeholders.
- [ ] **Logo:** `src/components/Logo.tsx` and `src/app/icon.svg` are stand-ins. Send an SVG.
- [ ] **Photos:** swap the Unsplash stock for SO's own dishes (same filenames in `public/img/` = zero code changes). For the hero plate, a top-down shot of a round plate works best.
- [ ] **About page copy** (`src/app/about/page.tsx`): real story, founder name and photo.
- [ ] Optional: a contact form that emails instead of using WhatsApp (Resend), and Paystack checkout.

## Fonts
Free stand-ins for the reference's paid fonts: **Bebas Neue** (display, in place of Bernier), **Plus Jakarta Sans** (body, in place of Circular Std), **Mrs Saint Delafield** (red script, in place of JanettaSilloam). To use licensed fonts, switch `layout.tsx` to `next/font/local` and keep the same CSS variable names.
