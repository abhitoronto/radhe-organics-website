import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Check, ClipboardCheck, Copy, Plus, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { HARVEST, type Veg } from '../data'
import { EASE } from '../motion'
import { Reveal, SectionHeading, WaitlistButton } from './ui'

const ALL = HARVEST.flatMap((c) => c.items)

export function Harvest() {
  const [tab, setTab] = useState(HARVEST[0].id)
  const [picked, setPicked] = useState<Set<string>>(() => new Set(['Carrot', 'Spinach', 'Green Peas', 'Cauliflower', 'Coriander']))
  const [copied, setCopied] = useState(false)

  const category = HARVEST.find((c) => c.id === tab)!
  const pickedItems = ALL.filter((v) => picked.has(v.en))

  const toggle = (v: Veg) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(v.en)) next.delete(v.en)
      else next.add(v.en)
      return next
    })

  const pickCategory = () => setPicked((prev) => new Set([...prev, ...category.items.map((v) => v.en)]))

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(pickedItems.map((v) => (v.hi ? `${v.en} (${v.hi})` : v.en)).join(', '))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the list is still visible on screen.
    }
  }

  return (
    <section id="harvest" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-leaf-300/25 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Choose your harvest"
          title="What's growing"
          accent="this winter?"
          intro="Pick the ones you love. Your farm is planted to match, and each item is harvested as it comes into season. Try it — build your farm below."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="min-w-0">
            <LayoutGroup>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                {HARVEST.map((c) => {
                  const count = c.items.filter((v) => picked.has(v.en)).length
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setTab(c.id)}
                      className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                        tab === c.id ? 'text-cream-50' : 'text-forest-800 hover:bg-forest-800/5'
                      }`}
                    >
                      {tab === c.id && (
                        <motion.span
                          layoutId="harvest-tab"
                          className="absolute inset-0 rounded-full bg-forest-800"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        <span>{c.emoji}</span>
                        {c.title}
                        {count > 0 && (
                          <span
                            className={`grid min-w-5 place-items-center rounded-full px-1 text-[0.65rem] font-bold ${
                              tab === c.id ? 'bg-leaf-300 text-forest-900' : 'bg-forest-800/10'
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {category.items.map((v) => {
                  const on = picked.has(v.en)
                  return (
                    <motion.li
                      key={v.en}
                      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { ease: EASE } } }}
                    >
                      <motion.button
                        type="button"
                        onClick={() => toggle(v)}
                        whileTap={{ scale: 0.97 }}
                        aria-pressed={on}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                          on
                            ? 'border-forest-800 bg-forest-800 text-cream-50 shadow-[0_16px_40px_-20px_rgb(36_70_31/0.9)]'
                            : 'border-forest-800/10 bg-white hover:border-forest-800/30'
                        }`}
                      >
                        <span className={`grid size-12 shrink-0 place-items-center rounded-xl text-2xl ${on ? 'bg-white/10' : 'bg-cream-100'}`}>
                          {v.emoji}
                        </span>
                        <span className="flex-1">
                          <span className="block font-serif text-lg leading-tight font-semibold">{v.en}</span>
                          {v.hi && (
                            <span className={`block text-sm italic ${on ? 'text-leaf-300' : 'text-ink/50'}`}>{v.hi}</span>
                          )}
                        </span>
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-full transition-colors ${
                            on ? 'bg-leaf-300 text-forest-900' : 'bg-cream-200 text-forest-800'
                          }`}
                        >
                          {on ? <Check className="size-4" /> : <Plus className="size-4" />}
                        </span>
                      </motion.button>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </AnimatePresence>

            <button
              type="button"
              onClick={pickCategory}
              className="mt-4 text-sm font-semibold text-forest-700 underline decoration-leaf-500 decoration-2 underline-offset-4 hover:text-forest-900"
            >
              Add all {category.title.toLowerCase()}
            </button>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-forest-800 p-6 text-cream-50 shadow-[0_40px_80px_-40px_rgb(19_38_15/0.9)] sm:p-7">
              <div className="flex items-baseline justify-between">
                <p className="eyebrow text-leaf-300">Your winter farm</p>
                <p className="text-sm text-cream-200/70">
                  <motion.span key={pickedItems.length} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-semibold text-cream-50">
                    {pickedItems.length}
                  </motion.span>{' '}
                  crops picked
                </p>
              </div>

              <div className="furrows mt-5 min-h-48 rounded-2xl bg-soil-700 p-3">
                {pickedItems.length === 0 ? (
                  <p className="grid h-44 place-items-center text-center text-sm text-cream-200/70">
                    Your plot is empty.
                    <br />
                    Tap a vegetable to plant it.
                  </p>
                ) : (
                  <motion.ul layout className="flex flex-wrap gap-2">
                    <AnimatePresence initial={false}>
                      {pickedItems.map((v) => (
                        <motion.li
                          layout
                          key={v.en}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                        >
                          <button
                            type="button"
                            onClick={() => toggle(v)}
                            className="flex items-center gap-1.5 rounded-full bg-cream-50 py-1.5 pr-3 pl-2 text-xs font-semibold text-forest-800 hover:bg-cream-200"
                            aria-label={`Remove ${v.en}`}
                          >
                            <span className="text-base leading-none">{v.emoji}</span>
                            {v.en}
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </div>

              <p className="mt-4 text-sm text-cream-200/75">
                No cap on choices — the more you pick, the better your variety through the season.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <WaitlistButton>Reserve this farm</WaitlistButton>
                <button
                  type="button"
                  onClick={copyList}
                  disabled={pickedItems.length === 0}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15 disabled:opacity-40"
                >
                  {copied ? <ClipboardCheck className="size-4 text-leaf-300" /> : <Copy className="size-4" />}
                  {copied ? 'Copied!' : 'Copy my list'}
                </button>
                <button
                  type="button"
                  onClick={() => setPicked(new Set())}
                  className="grid size-11 place-items-center rounded-full text-cream-200/70 hover:bg-white/10 hover:text-cream-50"
                  aria-label="Clear all picks"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
