import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { GALLERY, LOCATION_URL } from '../data'

/**
 * Pinned horizontal gallery: the section is as tall as the photo strip is wide,
 * so vertical scrolling slides the strip sideways while the frame stays put.
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [viewportH, setViewportH] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      setViewportH(window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 120, damping: 30, mass: 0.4 })
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="farm"
      ref={sectionRef}
      className="relative bg-forest-900 text-cream-50"
      style={{ height: distance ? distance + viewportH : undefined }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="eyebrow text-leaf-300">From our farm</p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Life on the farm, <em className="font-semibold text-leaf-300">up close.</em>
          </h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="mt-8 flex w-max items-end gap-4 pr-[8vw] pl-5 sm:mt-12 sm:gap-6 sm:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {GALLERY.map((g, i) => (
            <figure key={g.src} className={`shrink-0 ${i % 2 ? 'sm:mb-10' : ''}`}>
              <div className="group overflow-hidden rounded-3xl">
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="h-[46svh] w-auto object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[52svh]"
                  style={{ aspectRatio: `${g.w} / 1000` }}
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-2 font-serif text-base text-cream-200/85 italic">
                <span className="font-sans text-xs font-semibold text-leaf-300 not-italic">{String(i + 1).padStart(2, '0')}</span>
                {g.caption}
              </figcaption>
            </figure>
          ))}

          <a
            href={LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[46svh] w-[78vw] shrink-0 flex-col justify-between rounded-3xl bg-clay-500 p-7 sm:h-[52svh] sm:w-[26rem]"
          >
            <MapPin className="size-10" />
            <div>
              <p className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">Come visit anytime and see it for yourself.</p>
              <p className="mt-4 inline-flex items-center gap-2 font-semibold">
                Get directions
                <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
              </p>
            </div>
          </a>
        </motion.div>

        <div className="mx-auto mt-8 w-full max-w-6xl px-5 sm:px-8">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ scaleX: barScale }} className="h-full origin-left bg-leaf-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
