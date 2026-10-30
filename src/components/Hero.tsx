import { motion, useScroll, useTransform } from 'motion/react'
import { CalendarRange, LayoutGrid, Sprout, Truck } from 'lucide-react'
import { useRef } from 'react'
import { EASE } from '../motion'
import { WaitlistButton } from './ui'

const LINES: { words: string[]; accent?: boolean }[] = [
  { words: ['Know', 'exactly'] },
  { words: ['where', 'your', 'food'] },
  { words: ['comes', 'from.'], accent: true },
]

const STATS = [
  { icon: LayoutGrid, value: '100–150', unit: 'sq. yards', label: 'Your own farm' },
  { icon: Truck, value: 'Every', unit: 'week', label: 'Fresh harvest, home delivered' },
  { icon: CalendarRange, value: 'Nov –', unit: 'March', label: 'Winter season' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.3])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  let wordIndex = 0

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-forest-900 text-cream-50">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <motion.img
          src="/img/hero-farm.jpg"
          alt="Rows of winter vegetables growing at the Radhe Organics farm in Ludhiana"
          className="size-full object-cover"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-900/55 to-forest-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,transparent_0%,rgb(19_38_15/0.55)_70%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-28 pb-8 sm:px-8 sm:pb-10"
      >
        <motion.img
          src="/img/logo.png"
          alt="Radhe Organics — Pure soil. Pure you."
          className="mb-6 w-36 drop-shadow-[0_4px_20px_rgb(0_0_0/0.35)] sm:w-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        />

        <motion.p
          className="eyebrow flex items-center gap-3 text-leaf-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-leaf-300/60" />
          Winter Harvest Subscription · 2026–27
        </motion.p>

        <h1 className="mt-5 font-serif text-[clamp(2.9rem,min(8.5vw,12svh),7rem)] leading-[0.95] font-medium tracking-tight">
          {LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              {line.words.map((w) => {
                const i = wordIndex++
                return (
                  <motion.span
                    key={w}
                    className={`mr-[0.22em] inline-block ${line.accent ? 'font-normal text-leaf-300 italic' : ''}`}
                    initial={{ y: '110%', rotate: 4 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.55 + i * 0.07 }}
                  >
                    {w}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
        >
          <p className="inline-flex items-center gap-2.5 rounded-full bg-cream-50/95 px-5 py-3 font-serif text-base text-forest-800 sm:text-lg">
            <Sprout className="size-5 shrink-0 text-leaf-500" />A dedicated mini farm for you, managed by us.
          </p>
          <WaitlistButton size="lg">Book your winter slot</WaitlistButton>
        </motion.div>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } } }}
        >
          {STATS.map(({ icon: Icon, value, unit, label }) => (
            <motion.li
              key={label}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-md sm:p-5"
            >
              <Icon className="size-6 shrink-0 text-leaf-300 sm:size-7" />
              <div>
                <p className="font-serif text-2xl leading-tight sm:text-3xl">
                  {value} <span className="text-cream-200/90">{unit}</span>
                </p>
                <p className="eyebrow mt-1 !text-[0.65rem] text-cream-200/70">{label}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <RotatingBadge />
    </section>
  )
}

function RotatingBadge() {
  return (
    <motion.a
      href="#plans"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 1.6 }}
      className="absolute top-28 right-6 hidden size-36 lg:right-12 lg:block xl:top-36"
      aria-label="Limited farms this winter — see plans"
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 size-full text-cream-50">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans text-[15px] font-semibold tracking-[0.32em] uppercase">
          <textPath href="#badge-circle">Limited farms · Winter 2026–27 ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-7 grid place-items-center rounded-full bg-clay-500 text-cream-50 shadow-xl">
        <Sprout className="animate-sway size-9" />
      </span>
    </motion.a>
  )
}
