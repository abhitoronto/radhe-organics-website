import { HARVEST } from '../data'

const ITEMS = HARVEST.flatMap((c) => c.items)

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...ITEMS].reverse() : ITEMS
  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <div
        className="animate-marquee flex shrink-0 items-center gap-8 pr-8"
        style={{ animationDirection: reverse ? 'reverse' : 'normal', ['--marquee-duration' as string]: '90s' }}
      >
        {[...items, ...items].map((v, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 font-serif text-2xl whitespace-nowrap sm:text-3xl">
            <span className="text-xl">{v.emoji}</span>
            <span className={reverse ? 'italic' : ''}>{reverse ? (v.hi ?? v.en) : v.en}</span>
            <span className="text-clay-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <section className="relative z-10 -mt-px space-y-4 bg-forest-900 py-8 text-cream-100 sm:py-10">
      <Row />
      <div className="text-leaf-300/80">
        <Row reverse />
      </div>
    </section>
  )
}
