import { motion } from 'motion/react'
import { INSTAGRAM_URL, NAV_LINKS, WAITLIST_FORM_URL } from '../data'
import { EASE } from '../motion'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 pt-20 pb-8 text-cream-50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div>
            <img src="/img/logo.png" alt="Radhe Organics" className="w-40" />
            <p className="mt-4 max-w-xs text-sm text-cream-200/60">
              Winter Harvest Subscription 2026–27. A dedicated mini farm for you, managed by us. Baddowal, Ludhiana.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream-200/70 hover:text-cream-50">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={WAITLIST_FORM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-leaf-300 hover:text-cream-50">
                Join the waitlist
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-cream-200/70 hover:text-cream-50">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <motion.p
        initial={{ y: '40%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="mt-16 text-center font-serif text-[10.5vw] leading-[0.85] font-semibold tracking-tighter whitespace-nowrap text-cream-50/[0.07] select-none"
        aria-hidden="true"
      >
        Pure soil. Pure you.
      </motion.p>

      <p className="mt-6 text-center text-xs text-cream-200/40">© 2026 Radhe Organics. Grown naturally in Ludhiana.</p>
    </footer>
  )
}
