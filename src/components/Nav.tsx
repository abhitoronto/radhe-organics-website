import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NAV_LINKS } from '../data'
import { EASE } from '../motion'
import { SproutMark, WaitlistButton } from './ui'

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  const solid = scrolled || open

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-all duration-500 ${
            solid
              ? 'bg-cream-50/80 text-forest-800 shadow-[0_8px_40px_-12px_rgb(19_38_15/0.35)] ring-1 ring-forest-800/10 backdrop-blur-xl'
              : 'bg-transparent text-cream-50'
          }`}
        >
          <a href="#top" className="flex items-center gap-2" aria-label="Radhe Organics home">
            <SproutMark className="size-8" />
            <span className="font-serif text-lg font-semibold tracking-tight whitespace-nowrap">Radhe Organics</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    solid ? 'hover:bg-forest-800/5' : 'hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <WaitlistButton className="!py-2.5 whitespace-nowrap" />
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={`grid size-11 place-items-center rounded-full lg:hidden ${
                solid ? 'bg-forest-800 text-cream-50' : 'bg-white/15 backdrop-blur'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest-800 px-8 text-cream-50 lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="font-serif text-4xl font-semibold">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <WaitlistButton size="lg" className="mt-10 self-start" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
