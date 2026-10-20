/** Ripped-paper divider. The path is generated from a fixed seed so server and client render identically. */
function tornPath(seed: number) {
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  const pts: string[] = []
  let x = 0
  while (x < 1000) {
    const base = 10 + rand() * 7
    const spike = rand() > 0.82 ? rand() * 9 : 0
    pts.push(`${x.toFixed(1)},${(base + spike).toFixed(1)}`)
    x += 3 + rand() * 9
  }
  pts.push('1000,14')
  return `M0,0 H1000 V14 L${pts.reverse().join(' L')} L0,14 Z`
}

const TOP = tornPath(7)
const BOTTOM = tornPath(31)

export function TornEdge({ position, color = '#ffffff' }: { position: 'top' | 'bottom'; color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 30"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 z-10 block h-[22px] w-[calc(100%+2px)] md:h-[34px] ${position === 'top' ? '-top-px' : '-bottom-px rotate-180'}`}
    >
      <path d={position === 'top' ? TOP : BOTTOM} fill={color} />
    </svg>
  )
}
