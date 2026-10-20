type P = React.SVGProps<SVGSVGElement>

const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
})

export const CutleryIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 3l9.5 9.5M7 3L4 6l6.5 6.5M3 21l9-9M14.5 3.5c2.5-1 5 1.5 4 4l-2 2-4-4z M16.5 9.5L21 21M12 12l-1.5 1.5" />
  </svg>
)
export const CartIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" />
    <circle cx="9.5" cy="20" r="1.3" />
    <circle cx="17.5" cy="20" r="1.3" />
  </svg>
)
export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="13.5" cy="10.5" r="6.5" />
    <path d="M8.8 15.2L3.5 20.5" />
  </svg>
)
export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6h18M3 12h18M9 18h12" />
  </svg>
)
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const PhoneIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
)
export const WhatsAppIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
)
export const InstagramIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)
export const FacebookIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14.1 2C10.9 2 10.2 4.4 10.2 6v2.5H8V12h2.2v10H14V12h2.7l.4-3.5z" />
  </svg>
)
export const ChevronIcon = (p: P) => (
  <svg {...base(p)} viewBox="0 0 20 60" strokeWidth={1.4}>
    <path d="M3 2l14 28L3 58" />
  </svg>
)
export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const MinusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
)
export const HomeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
  </svg>
)
export const BookIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20" />
  </svg>
)
export const QuoteIcon = (p: P) => (
  <svg width="60" height="44" viewBox="0 0 60 44" aria-hidden {...p}>
    <path fill="currentColor" d="M0 0h24v24l-10 20H4l8-20H0zM34 0h24v24L48 44H38l8-20H34z" />
  </svg>
)
