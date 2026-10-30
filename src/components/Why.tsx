import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Droplet, Eye, HandHeart, ListChecks, SprayCan, Syringe, TriangleAlert } from 'lucide-react'
import { useRef } from 'react'
import { EASE } from '../motion'
import { Reveal, SectionHeading } from './ui'

const THREATS = [
  { icon: SprayCan, label: 'Chemical pesticides' },
  { icon: Syringe, label: 'Growth injections' },
  { icon: Droplet, label: 'Artificial colouring' },
  { icon: TriangleAlert, label: 'Heavy-metal residues' },
]

const PILLARS = [
  { icon: ListChecks, title: 'You choose', body: 'Pick the vegetables for your farm.' },
  { icon: HandHeart, title: "It's yours", body: 'What your farm yields belongs to you.' },
  { icon: Eye, title: 'See it grow', body: 'Visit your farm anytime.' },
]

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why Radhe Organics?"
              title="Do you really know what's on"
              accent="your plate"
              tail="?"
              intro={
                <>
                  We feed our families every day, trusting that the food is good for them. But most vegetables pass
                  through countless hands before they reach our kitchens, and{' '}
                  <span className="font-medium text-forest-700">we rarely know how they were grown.</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
                Even the word “<em className="font-serif">Organic</em>” has lost its meaning, because there is no way to
                see how that food was actually grown.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 self-center sm:gap-4">
            {THREATS.map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-forest-800/10 bg-white p-5 shadow-[0_20px_50px_-30px_rgb(36_70_31/0.4)] sm:p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cream-200 text-clay-500">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-5 font-serif text-lg leading-snug font-semibold text-ink sm:text-xl">
                    <motion.span
                      className="bg-[linear-gradient(var(--color-clay-500),var(--color-clay-500))] bg-[length:0%_3px] bg-[position:0_58%] bg-no-repeat"
                      initial={{ backgroundSize: '0% 3px' }}
                      whileInView={{ backgroundSize: '100% 3px' }}
                      viewport={{ once: true, margin: '-120px' }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.5 + i * 0.15 }}
                    >
                      {label}
                    </motion.span>
                  </p>
                  <p className="eyebrow mt-3 !text-[0.6rem] !tracking-[0.2em] text-leaf-500">Never on your farm</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ScrollQuote />

        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink/75 sm:text-xl">
            So we give you <span className="font-semibold text-forest-700">your own piece of farmland</span>. You choose
            what grows on it, we grow it naturally, and nurture it for you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative h-full overflow-hidden rounded-3xl bg-forest-800 p-7 text-cream-50"
              >
                <span className="absolute -top-6 -right-2 font-serif text-[7rem] leading-none text-white/5">
                  0{i + 1}
                </span>
                <Icon className="size-7 text-leaf-300" />
                <h3 className="mt-8 font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-cream-200/75">{body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const QUOTE = 'You deserve more than a label. You deserve to know.'

/** Each word brightens as the quote scrolls through the viewport. */
function ScrollQuote() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })
  const words = QUOTE.split(' ')
  return (
    <blockquote className="relative my-24 sm:my-32">
      <span aria-hidden="true" className="absolute -top-16 left-0 font-serif text-[10rem] leading-none text-leaf-300/40 sm:-left-6">
        “
      </span>
      <p
        ref={ref}
        className="relative font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[1.08] font-semibold tracking-tight text-forest-800 italic"
      >
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </blockquote>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}
