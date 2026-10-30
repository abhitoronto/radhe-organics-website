import { AnimatePresence, motion, useInView } from 'motion/react'
import { Clock, Footprints, Lock, MapPin, Truck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks'
import { EASE } from '../motion'
import { Reveal, SectionHeading, WaitlistButton } from './ui'

const STEPS = [
  { title: 'Reserve your own farm', body: '100–150 sq. yards of farmland, allotted just for you for the whole winter.' },
  { title: 'Its produce is all yours', body: 'Everything your plot produces belongs to your family. No sharing, no pooling.' },
  { title: 'You choose what grows', body: 'Pick from 30+ winter vegetables, greens and herbs. We plant your farm to match.' },
  { title: 'We grow and manage your mini farm', body: 'Our team sows, waters, weeds and nurtures it — naturally, without chemicals.' },
  { title: 'Fresh harvest delivered every week', body: "Whatever's ready that week is picked and brought to your home." },
]

const BEDS = [
  { name: 'Carrot', emoji: '🥕' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Cauliflower', emoji: '🥦' },
  { name: 'Green Peas', emoji: '🫛' },
  { name: 'Tomato', emoji: '🍅' },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    // A step becomes active when it crosses the vertical middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // On small screens the plot isn't pinned beside the steps, so it plays through them on its own.
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const plotRef = useRef<HTMLDivElement>(null)
  const plotInView = useInView(plotRef, { amount: 0.6 })
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    if (isDesktop || !plotInView) return
    const id = setInterval(() => setCycle((c) => (c + 1) % STEPS.length), 1800)
    return () => clearInterval(id)
  }, [isDesktop, plotInView])

  return (
    <section id="how" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="The Land Is Ours."
          accent="The Harvest Is Yours."
          intro="With your package, you reserve your own dedicated farm. Everything it produces belongs to your family."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={plotRef} className="self-start lg:sticky lg:top-28">
            <FarmPlot step={isDesktop ? active : cycle} />
          </div>

          <ol className="relative space-y-2 lg:space-y-4 lg:py-[18vh]">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                data-step={i}
                className="lg:min-h-[34vh]"
              >
                <motion.div
                  animate={{ opacity: !isDesktop || active === i ? 1 : 0.4, x: !isDesktop || active === i ? 0 : -6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex gap-5 rounded-3xl p-5 sm:p-6"
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-full font-serif text-lg font-semibold transition-colors duration-500 ${
                      !isDesktop || active >= i ? 'bg-forest-800 text-cream-50' : 'bg-cream-200 text-forest-800'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-md text-ink/70">{s.body}</p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full items-start gap-5 rounded-3xl bg-cream-200 p-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-800 text-cream-50">
                <Footprints className="size-6" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-forest-800">Visit your farm</h3>
                <p className="mt-1 text-ink/70">Come see your farm and harvest it yourself.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col items-start justify-between gap-5 rounded-3xl bg-clay-500 p-7 text-cream-50 sm:flex-row sm:items-center">
              <div className="flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20">
                  <Clock className="size-6" />
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-semibold">Limited farms</h3>
                  <p className="mt-1 text-cream-50/85">Book early to secure yours this winter.</p>
                </div>
              </div>
              <WaitlistButton variant="cream" className="shrink-0">
                Book now
              </WaitlistButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** An illustrated plot that "grows" through the five steps as the user scrolls. */
function FarmPlot({ step }: { step: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-forest-800 p-4 shadow-[0_40px_80px_-40px_rgb(19_38_15/0.8)] sm:p-6">
      <div className="mb-4 flex items-center justify-between text-cream-50">
        <p className="eyebrow text-leaf-300">Your farm</p>
        <p className="flex items-center gap-1.5 text-xs text-cream-200/70">
          <MapPin className="size-3.5" /> Baddowal, Ludhiana
        </p>
      </div>

      <div className="relative aspect-[5/4] rounded-2xl bg-soil-700 p-3 sm:p-4">
        <svg className="pointer-events-none absolute inset-1.5 size-[calc(100%-12px)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.rect
            x="0.5"
            y="0.5"
            width="99"
            height="99"
            rx="3"
            fill="none"
            stroke="#a8d38f"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </svg>

        <div className="grid h-full grid-rows-5 gap-2">
          {BEDS.map((bed, bi) => (
            <div key={bed.name} className="furrows relative flex items-center gap-1 rounded-lg bg-[#7d4a26] px-2 sm:px-3">
              <AnimatePresence>
                {step >= 2 && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: bi * 0.06, ease: EASE }}
                    className="mr-1 w-20 shrink-0 truncate rounded-md bg-cream-50/90 px-1.5 py-0.5 text-[0.65rem] font-semibold text-forest-800 sm:w-24 sm:text-xs"
                  >
                    {bed.name}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="flex flex-1 justify-around">
                {Array.from({ length: 6 }).map((_, pi) => (
                  <motion.span
                    key={pi}
                    className="text-lg leading-none sm:text-2xl"
                    animate={{
                      scale: step >= 3 ? 1 : step >= 2 ? 0.55 : 0,
                      opacity: step >= 2 ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: (bi * 6 + pi) * 0.015 }}
                  >
                    {step >= 3 ? bed.emoji : '🌱'}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="absolute inset-0 m-auto h-fit w-fit rounded-xl border-4 border-cream-50 px-5 py-2 text-center font-serif text-2xl font-bold tracking-wider text-cream-50 uppercase sm:text-3xl"
            >
              Reserved
              <span className="block font-sans text-[0.6rem] tracking-[0.3em]">100–150 sq. yd.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex min-h-12 items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step >= 4 ? 'deliver' : step >= 1 ? 'owned' : 'reserve'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-3 rounded-full bg-cream-50 px-4 py-2.5 text-sm font-medium text-forest-800"
          >
            {step >= 4 ? (
              <>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  <Truck className="size-5 text-clay-500" />
                </motion.span>
                This week's basket is on its way home
              </>
            ) : step >= 1 ? (
              <>
                <Lock className="size-5 text-clay-500" /> Every vegetable here belongs to your family
              </>
            ) : (
              <>
                <MapPin className="size-5 text-clay-500" /> A plot set aside just for you
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
