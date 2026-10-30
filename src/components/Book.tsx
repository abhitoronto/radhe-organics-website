import { motion } from 'motion/react'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import {
  ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOCATION_URL,
  PHONES,
  WAITLIST_FORM_DISPLAY,
  WAITLIST_FORM_URL,
} from '../data'
import { InstagramIcon, Reveal, SectionHeading, WaitlistButton, WhatsAppIcon } from './ui'

export function Book() {
  return (
    <section id="book" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Book your slot"
          title="Reserve your farm"
          accent="today."
          intro="Limited farms this winter. Join the waitlist, or call/WhatsApp us to secure yours."
        />

        <Reveal className="mt-12">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-forest-800 p-7 text-cream-50 sm:p-12">
            <motion.div
              aria-hidden="true"
              className="absolute -top-32 -right-24 -z-10 size-[30rem] rounded-full bg-leaf-500/40 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -bottom-40 -left-20 -z-10 size-[26rem] rounded-full bg-clay-500/30 blur-3xl"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
              <a
                href={WAITLIST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden w-52 rotate-[-3deg] rounded-3xl bg-white p-4 shadow-2xl transition-transform duration-500 hover:rotate-0 md:block"
                aria-label="Waitlist form QR code"
              >
                <img src="/img/qr-waitlist.png" alt="QR code linking to the Radhe Organics waitlist form" className="w-full" />
                <p className="mt-2 text-center text-[0.65rem] font-semibold tracking-[0.2em] text-forest-800 uppercase">
                  Scan to join
                </p>
              </a>
              <div>
                <p className="eyebrow text-leaf-300">Join the waitlist</p>
                <h3 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-6xl">Save your spot in 1 minute.</h3>
                <p className="mt-4 max-w-lg text-cream-200/80">
                  Scan the QR or tap below to fill our short form. We'll get in touch to reserve your farm.
                </p>
                <WaitlistButton size="lg" className="mt-8">
                  Fill the waitlist form
                </WaitlistButton>
                <p className="mt-5 text-xs break-all text-cream-200/50">{WAITLIST_FORM_DISPLAY}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <ul className="grid h-full gap-3 rounded-[2rem] bg-cream-200 p-5 sm:grid-cols-2 sm:p-6">
              {PHONES.map((p) => (
                <li key={p.tel} className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3 pr-4">
                  <a href={`tel:${p.tel}`} className="flex flex-1 items-center gap-3 font-semibold text-forest-800 hover:text-forest-600">
                    <span className="grid size-11 place-items-center rounded-full bg-forest-800 text-cream-50">
                      <Phone className="size-5" />
                    </span>
                    {p.display}
                  </a>
                  <a
                    href={`https://wa.me/${p.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${p.display}`}
                    className="grid size-9 place-items-center rounded-full text-leaf-500 hover:bg-leaf-100"
                  >
                    <WhatsAppIcon className="size-5" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-3 rounded-2xl bg-cream-50 p-3 font-semibold text-forest-800 hover:text-forest-600"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-forest-800 text-cream-50">
                    <InstagramIcon className="size-5" />
                  </span>
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-3 rounded-2xl bg-cream-50 p-3 text-sm font-semibold text-forest-800 hover:text-forest-600"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-800 text-cream-50">
                    <MapPin className="size-5" />
                  </span>
                  {ADDRESS}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-6 rounded-[2rem] border border-forest-800/10 bg-white p-6"
            >
              <img src="/img/qr-location.png" alt="QR code with directions to the farm" className="w-28 shrink-0 rounded-xl sm:w-32" />
              <div>
                <p className="font-serif text-2xl font-semibold text-forest-800">Farm location</p>
                <p className="mt-1 text-sm text-ink/65">Scan for directions and come see your farm.</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-clay-500">
                  Open in maps <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </p>
              </div>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:gap-0">
            {['Twinkle Gupta', 'Siddharth Gupta'].map((name, i) => (
              <div key={name} className={`px-10 ${i ? 'sm:border-l sm:border-forest-800/15' : ''}`}>
                <p className="font-serif text-3xl font-medium text-forest-800">{name}</p>
                <p className="eyebrow mt-1 !text-[0.65rem] text-ink/50">Founder</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
