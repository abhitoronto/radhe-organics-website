import Lenis from 'lenis'
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { Book } from './components/Book'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Harvest } from './components/Harvest'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Plans } from './components/Plans'
import { WaitlistButton } from './components/ui'
import { Why } from './components/Why'

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.1 })
    return () => lenis.destroy()
  }, [])
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-clay-500" />
}

/** Compact waitlist bar pinned to the bottom of small screens once the hero is scrolled past. */
function MobileCta() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    const nearEnd = v + window.innerHeight > document.documentElement.scrollHeight - 900
    setShow(v > window.innerHeight * 0.8 && !nearEnd)
  })
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-between gap-3 rounded-full bg-forest-800/95 py-2 pr-2 pl-5 text-cream-50 shadow-2xl ring-1 ring-white/10 backdrop-blur sm:hidden"
        >
          <span className="text-sm leading-tight">
            <span className="block font-semibold">Limited farms</span>
            <span className="text-xs text-cream-200/70">Winter 2026–27</span>
          </span>
          <WaitlistButton className="!py-2.5">Join waitlist</WaitlistButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Why />
          <HowItWorks />
          <Harvest />
          <Plans />
          <Gallery />
          <Faq />
          <Book />
        </main>
        <Footer />
        <MobileCta />
      </div>
    </MotionConfig>
  )
}
