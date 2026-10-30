import { motion, type HTMLMotionProps } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { WAITLIST_FORM_URL } from '../data'
import { EASE } from '../motion'

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  tail,
  intro,
  dark = false,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  accent?: ReactNode
  tail?: ReactNode
  intro?: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <Reveal className={className}>
      <p className={`eyebrow ${dark ? 'text-leaf-300' : 'text-leaf-500'}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-serif text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl ${
          dark ? 'text-cream-50' : 'text-forest-800'
        }`}
      >
        {title}{' '}
        {accent && <em className={`font-semibold ${dark ? 'text-leaf-300' : 'text-leaf-500'}`}>{accent}</em>}
        {tail}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${dark ? 'text-cream-200/80' : 'text-ink/70'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

export function WaitlistButton({
  children = 'Join the waitlist',
  variant = 'clay',
  size = 'md',
  className = '',
}: {
  children?: ReactNode
  variant?: 'clay' | 'forest' | 'cream'
  size?: 'md' | 'lg'
  className?: string
}) {
  const styles = {
    clay: 'bg-clay-500 text-cream-50 hover:bg-clay-600 shadow-[0_10px_30px_-10px_rgb(196_104_45/0.7)]',
    forest: 'bg-forest-800 text-cream-50 hover:bg-forest-700 shadow-[0_10px_30px_-12px_rgb(36_70_31/0.7)]',
    cream: 'bg-cream-50 text-forest-800 hover:bg-white',
  }[variant]
  const sizing = size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'
  return (
    <motion.a
      href={WAITLIST_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${styles} ${sizing} ${className}`}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="size-4" />
      </span>
    </motion.a>
  )
}

export function SproutMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 50V30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 33c0-10 7-17 17-18-1 10-7 17-17 18z" fill="#6a9a4f" />
      <path d="M32 38c-1-8-7-13-15-13 0 8 6 13 15 13z" fill="currentColor" />
      <path d="M14 51c6-3 30-3 36 0" stroke="#c4682d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 9.43 9.44c0 5.2-4.24 9.42-9.44 9.42zm8.03-17.46A11.27 11.27 0 0 0 12.05.7C5.8.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.72-1.5a11.33 11.33 0 0 0 5.73 1.46c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  )
}
