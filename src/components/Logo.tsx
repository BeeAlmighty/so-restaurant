/** Placeholder brand mark: crossed fork & spoon over a yellow bowl. TODO: swap for SO's real logo (SVG). */
export function LogoMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g stroke="#eb1c22" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M18 6l22 28" />
        <path d="M14 9l4-4M18 12l4-4M22 15l3-3" />
        <path d="M46 6L26 33" />
      </g>
      <ellipse cx="47.5" cy="8.5" rx="5" ry="6.5" transform="rotate(36 47.5 8.5)" fill="#eb1c22" />
      <path d="M6 32h52a26 26 0 0 1-52 0z" fill="#f6b909" />
      <path d="M22 58h20" stroke="#f6b909" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className={compact ? 'h-9 w-9' : 'h-12 w-12'} />
      <span className={`flex flex-col leading-none ${light ? 'text-white' : 'text-ink'}`}>
        <span className={`font-display ${compact ? 'text-[28px]' : 'text-[38px]'} leading-[0.85] tracking-wider`}>SO</span>
        <span className={`font-sans ${compact ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-[0.32em]`}>Restaurant</span>
      </span>
    </span>
  )
}
