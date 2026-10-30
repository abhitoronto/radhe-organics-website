import { AnimatePresence, motion } from 'motion/react'
import { Phone, Plus } from 'lucide-react'
import { useState } from 'react'
import { FAQS, PHONES } from '../data'
import { EASE } from '../motion'
import { Reveal, SectionHeading, WhatsAppIcon } from './ui'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQs" title="Your questions," accent="answered." />
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl bg-cream-200 p-6">
              <p className="font-serif text-xl font-semibold text-forest-800">Still have a question?</p>
              <p className="mt-1 text-sm text-ink/65">Call or WhatsApp us anytime.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${PHONES[0].whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-4 py-2.5 text-sm font-semibold text-cream-50 hover:bg-forest-700"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONES[0].tel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-forest-800 hover:bg-cream-50"
                >
                  <Phone className="size-4" /> {PHONES[0].display}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="divide-y divide-forest-800/10 border-y border-forest-800/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <Reveal delay={Math.min(i, 4) * 0.04} y={16}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="mt-1 font-sans text-sm font-semibold text-leaf-500 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-serif text-xl font-semibold text-forest-800 transition-colors group-hover:text-forest-600 sm:text-2xl">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? 'bg-clay-500 text-cream-50' : 'bg-cream-200 text-forest-800'
                      }`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-10 leading-relaxed text-ink/70 sm:pr-14">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
