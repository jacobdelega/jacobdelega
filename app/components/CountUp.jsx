'use client'

import { useEffect, useRef, useState } from 'react'

// Counts up to `value` the first time it scrolls into view.
export default function CountUp({ value, suffix = '+', className = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setN(0)
    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const step = (now) => {
          const p = Math.min(1, (now - start) / 1600)
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
