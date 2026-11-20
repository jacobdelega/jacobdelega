'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { website, custom, faqs, automation } from '../content'

const STEP_MS = 3200

// Fills the contact form below and scrolls to it.
function startProject(detail) {
  window.dispatchEvent(new CustomEvent('contact:prefill', { detail }))
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('contact')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

// A soft light that follows the pointer across a card.
function useSpotlight() {
  return {
    onPointerMove(e) {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
  }
}

function Check({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 size-5 flex-none ${className}`} aria-hidden="true">
      <path d="M5 10.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// The week, day by day. Plays through on its own until someone picks a step.
function Week({ steps }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => setAuto((a) => (a === 'off' ? a : entry.isIntersecting)), {
      threshold: 0.5,
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const playing = auto === true && !paused
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => setActive((i) => (i + 1) % steps.length), STEP_MS)
    return () => clearTimeout(id)
  }, [playing, active, steps.length])

  function pick(i) {
    setAuto('off')
    setActive(i)
  }

  const step = steps[active]
  return (
    <div
      ref={ref}
      className="rounded-2xl border border-line bg-soft/60 p-5 sm:p-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="font-semibold">Live in 7 days</p>
      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2" role="tablist" aria-label="How the week goes">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="week-panel"
            onClick={() => pick(i)}
            className="group text-left"
          >
            <span className="block h-1.5 overflow-hidden rounded-full bg-line">
              {i < active && <span className="block h-full w-full bg-coral" />}
              {i === active && (
                <span
                  key={`${active}-${playing}`}
                  className={`block h-full bg-coral ${playing ? 'week-fill' : 'w-full'}`}
                  style={{ animationDuration: `${STEP_MS}ms` }}
                />
              )}
            </span>
            <span className={`mt-2.5 block text-xs ${i === active ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>
              {s.day}
            </span>
            <span
              className={`hidden text-sm font-semibold sm:block ${i === active ? 'text-ink' : 'text-muted group-hover:text-ink'}`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>
      <div id="week-panel" role="tabpanel" className="mt-5 min-h-[4.5rem]" aria-live="polite">
        <div key={active} className="swap-in">
          <p className="font-display text-xl font-semibold tracking-[-0.01em]">
            <span className="text-muted sm:hidden">{step.day}: </span>
            {step.title}
          </p>
          <p className="mt-1 text-muted">{step.text}</p>
        </div>
      </div>
    </div>
  )
}

// Types out example ideas one after another, while the box is empty and not in use.
function useTypewriter(words, running) {
  const [text, setText] = useState(words[0])

  useEffect(() => {
    if (!running || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    let n = words[0].length
    let deleting = true
    let timer
    setText(words[0])
    const tick = () => {
      const word = words[i]
      if (deleting) {
        n -= 1
        setText(word.slice(0, Math.max(0, n)))
        if (n <= 0) {
          deleting = false
          i = (i + 1) % words.length
          timer = setTimeout(tick, 300)
          return
        }
        timer = setTimeout(tick, 22)
      } else {
        n += 1
        setText(words[i].slice(0, n))
        if (n >= words[i].length) {
          deleting = true
          timer = setTimeout(tick, 1900)
          return
        }
        timer = setTimeout(tick, 48)
      }
    }
    timer = setTimeout(tick, 1900)
    return () => clearTimeout(timer)
  }, [running, words])

  return text
}

const AUTOMATION_WORDS = /automat|report|post|content|lead|email|spreadsheet|every (day|week|monday)/i

function CustomCard() {
  const [idea, setIdea] = useState('')
  const [focused, setFocused] = useState(false)
  const spotlight = useSpotlight()
  const hint = useTypewriter(custom.ideas, !focused && !idea)

  function submit(event) {
    event.preventDefault()
    const text = idea.trim()
    startProject({ need: AUTOMATION_WORDS.test(text) ? 'automation' : 'other', details: text ? `${text} ` : '' })
  }

  return (
    <div
      {...spotlight}
      className="spotlight flex flex-col rounded-[28px] bg-night p-7 text-white [--spot:rgb(123_97_255/0.28)] sm:p-10 lg:col-span-5"
    >
      <h3 className="font-display text-3xl font-bold tracking-[-0.025em]">{custom.title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-white/70">{custom.who}</p>

      <form
        onSubmit={submit}
        className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-4 transition focus-within:border-white/50 focus-within:bg-white/[0.09] sm:p-5"
      >
        <label htmlFor="idea" className="sr-only">
          Describe your idea
        </label>
        <div className="relative">
          <textarea
            id="idea"
            rows={3}
            value={idea}
            maxLength={500}
            onChange={(e) => setIdea(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) submit(e)
            }}
            className="block w-full resize-none bg-transparent text-lg leading-snug text-white outline-none"
          />
          {!idea && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-lg leading-snug text-white/40">
              {focused ? 'Describe it in a sentence…' : hint}
              {!focused && <span className="caret" />}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-white/45">Free 15-minute call first</span>
          <button
            type="submit"
            className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#e9eaf0] active:scale-[0.98]"
          >
            Get a quote
          </button>
        </div>
      </form>

      <div className="mt-10 lg:mt-auto lg:pt-10">
        <p className="text-sm text-white/50">Recently built</p>
        <ul className="mt-2">
          {custom.proof.map((p) => (
            <li key={p.name}>
              <a href="#work" className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.07]">
                {p.img ? (
                  <span className="h-6 w-12 flex-none overflow-hidden rounded-full">
                    <Image src={p.img} width={96} height={48} alt="" className="size-full object-cover" />
                  </span>
                ) : (
                  <span className="flex h-6 w-12 flex-none items-center justify-center gap-1 rounded-full bg-white/10">
                    <i className="size-1.5 rounded-full bg-white/40" />
                    <i className="size-1.5 rounded-full bg-coral" />
                    <i className="size-1.5 rounded-full bg-white/40" />
                  </span>
                )}
                <span className="font-semibold">{p.name}</span>
                <span className="ml-auto text-sm text-white/55">
                  {p.stat ? `${automation.stat.toLocaleString('en-US')}+ ${p.what}` : p.what}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function WebsiteCard() {
  const spotlight = useSpotlight()
  return (
    <div
      {...spotlight}
      className="spotlight flex flex-col rounded-[28px] border border-line bg-white p-7 [--spot:rgb(255_91_55/0.10)] sm:p-10 lg:col-span-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h3 className="font-display text-3xl font-bold tracking-[-0.025em]">{website.title}</h3>
      </div>
      <p className="mt-6 font-display text-6xl leading-none font-bold tracking-[-0.04em]">
        {website.pricePrefix && (
          <span className="mr-2 align-[0.6em] font-sans text-lg font-semibold tracking-normal text-muted">{website.pricePrefix}</span>
        )}
        {website.price}
      </p>
      <p className="mt-2 text-muted">{website.priceNote}</p>

      <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {website.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="text-coral" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Week steps={website.week} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          className="btn"
          onClick={() => startProject({ need: website.cta.need, budget: website.cta.budget })}
        >
          {website.cta.label}
        </button>
      </div>
    </div>
  )
}

function Faq() {
  return (
    <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12">
      <h3 className="font-display text-3xl font-bold tracking-[-0.025em] md:col-span-4">Common questions</h3>
      <div className="divide-y divide-line border-y border-line md:col-span-8">
        {faqs.map(([q, a]) => (
          <details key={q} name="faq" className="faq group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
              {q}
              <span
                className="grid size-8 flex-none place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-white"
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" className="size-3.5">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="faq-body max-w-[40rem] pb-6 text-muted">{a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <WebsiteCard />
        <CustomCard />
      </div>
      <Faq />
    </>
  )
}
