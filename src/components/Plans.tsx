import { AnimatePresence, motion } from 'motion/react'
import { Check, Ellipsis } from 'lucide-react'
import { useState, type MouseEvent, type ReactNode } from 'react'
import { PLANS, formatINR } from '../data'
import { EASE } from '../motion'
import { Reveal, SectionHeading, WaitlistButton } from './ui'

type Mode = 'full' | 'instalments'

export function Plans() {
  const [mode, setMode] = useState<Mode>('full')

  return (
    <section id="plans" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Subscription packages"
            title="Choose the plan for"
            accent="your family."
            intro={
              <>
                One price covers <strong className="font-semibold text-forest-800">the entire winter season</strong>,
                mid-November to March.
              </>
            }
          />
          <Reveal delay={0.1}>
            <div role="radiogroup" aria-label="Payment option" className="inline-flex rounded-full bg-cream-200 p-1.5">
              {(
                [
                  ['full', 'Pay in full'],
                  ['instalments', '3 instalments'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={mode === id}
                  onClick={() => setMode(id)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    mode === id ? 'text-cream-50' : 'text-forest-800'
                  }`}
                >
                  {mode === id && (
                    <motion.span
                      layoutId="pay-mode"
                      className="absolute inset-0 rounded-full bg-forest-800"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <PlanCard plan={p} mode={mode} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 grid gap-6 rounded-3xl border-2 border-dashed border-leaf-500/40 p-6 sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:p-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-forest-800">How you can pay</h3>
              <p className="text-sm font-medium text-leaf-500">Pay in full, or in 3 easy instalments.</p>
            </div>
            <PayOption icon={<Check className="size-5" />} title="Pay in full" body="One payment for the whole season" />
            <PayOption icon={<Ellipsis className="size-5" />} title="3 easy instalments" body="Split the season into 3 payments" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PayOption({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-800 text-cream-50">{icon}</span>
      <div>
        <p className="font-semibold text-forest-800">{title}</p>
        <p className="text-sm text-ink/60">{body}</p>
      </div>
    </div>
  )
}

function PlanCard({ plan, mode }: { plan: (typeof PLANS)[number]; mode: Mode }) {
  const dark = plan.featured
  const amount = mode === 'full' ? plan.total : plan.instalment

  // Soft spotlight that follows the cursor across the card.
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group relative h-full overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
        dark
          ? 'bg-forest-800 text-cream-50 shadow-[0_40px_80px_-40px_rgb(19_38_15/0.9)]'
          : 'border border-forest-800/10 bg-white text-ink shadow-[0_30px_60px_-40px_rgb(36_70_31/0.5)]'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--x) var(--y), ${dark ? 'rgb(168 211 143 / 0.16)' : 'rgb(106 154 79 / 0.12)'}, transparent 60%)`,
        }}
      />
      {dark && (
        <span className="absolute top-6 right-6 rounded-full bg-clay-500 px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.2em] text-cream-50 uppercase">
          Most value
        </span>
      )}

      <p className={`eyebrow ${dark ? 'text-leaf-300' : 'text-leaf-500'}`}>{plan.family}</p>
      <h3 className={`mt-3 font-serif text-3xl font-semibold ${dark ? '' : 'text-forest-800'}`}>{plan.name}</h3>

      <div className={`mt-6 flex items-start font-serif ${dark ? '' : 'text-forest-800'}`}>
        <span className="mt-2 text-3xl">₹</span>
        <div className="relative h-[4.5rem] overflow-hidden sm:h-20">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={amount}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-6xl leading-[1.15] font-semibold tracking-tight sm:text-7xl"
            >
              {formatINR(amount)}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {mode === 'instalments' && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="mt-auto mb-3 ml-2 font-sans text-lg font-semibold opacity-70"
            >
              × 3
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p
        className={`mt-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold ${
          dark ? 'bg-white/10 text-cream-50' : 'bg-cream-200 text-forest-800'
        }`}
      >
        {mode === 'full' ? 'For the full winter season' : `₹${formatINR(plan.total)} total for the season`}
      </p>

      <p className={`mt-5 font-semibold ${dark ? 'text-cream-50' : 'text-ink'}`}>
        Pay in full, or{' '}
        <span className={dark ? 'text-leaf-300' : 'text-leaf-500'}>3 instalments of ₹{formatINR(plan.instalment)}</span>
      </p>

      <ul className={`mt-6 space-y-3 border-t pt-6 ${dark ? 'border-white/15' : 'border-forest-800/10'}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm font-medium">
            <span className={`grid size-6 place-items-center rounded-full ${dark ? 'bg-leaf-300 text-forest-900' : 'bg-leaf-100 text-forest-700'}`}>
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <WaitlistButton variant={dark ? 'clay' : 'forest'} className="mt-8 w-full">
        Reserve a {plan.name.toLowerCase()} farm
      </WaitlistButton>
    </motion.div>
  )
}
