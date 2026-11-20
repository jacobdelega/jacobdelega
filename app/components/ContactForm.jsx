'use client'

import { useEffect, useRef, useState } from 'react'
import { site, needs, budgets, timelines } from '../content'

// Fields that fill in when a pricing button prefills the letter flash briefly.
function flash(el) {
  if (!el) return
  el.classList.remove('blank-flash')
  void el.offsetWidth
  el.classList.add('blank-flash')
}

function Blank({ list, name, label, placeholder }) {
  return (
    <select name={name} required defaultValue="" aria-label={label} className="blank blank-select">
      <option value="" disabled>
        {placeholder}
      </option>
      {list.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [sent, setSent] = useState(null)
  const [signature, setSignature] = useState('')
  const formRef = useRef(null)

  // Buttons elsewhere on the page (pricing) can fill in the letter for the visitor.
  useEffect(() => {
    function onPrefill(event) {
      const form = formRef.current
      if (!form) return
      const { need, budget, details } = event.detail || {}
      if (need) {
        form.elements.need.value = need
        flash(form.elements.need)
      }
      if (budget) {
        form.elements.budget.value = budget
        flash(form.elements.budget)
      }
      if (details && !form.elements.details.value.trim()) {
        form.elements.details.value = details
        flash(form.elements.details)
      }
      setTimeout(() => form.elements.name.focus({ preventScroll: true }), 700)
    }
    window.addEventListener('contact:prefill', onPrefill)
    return () => window.removeEventListener('contact:prefill', onPrefill)
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(out.error || `Your message didn’t send. Email me at ${site.email} instead.`)
        setStatus('error')
        return
      }
      setSent(data)
      setStatus('sent')
      form.reset()
    } catch {
      setError(`Your message didn’t send. Check your connection, or email me at ${site.email}.`)
      setStatus('error')
    }
  }

  // The reply comes back as a short letter too.
  if (status === 'sent' && sent) {
    const small = sent.budget === 'under-500'
    return (
      <div role="status" className="letter swap-in">
        <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#16b364" />
          <path d="M14 25l7 7 13-15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
        </svg>
        <div className="letter-text mt-8">
          <p className="text-white">Hi {sent.name.split(' ')[0]},</p>
          <p className="mt-4">
            Got it. I’ll reply to <span className="text-white">{sent.email}</span> within two days.
            {small && ' Projects under $500 are usually smaller than what I take on, but I’ll read it and send you options.'}
          </p>
          <p className="mt-6 text-white">Jacob</p>
        </div>
        {site.bookingUrl && !small && (
          <a href={site.bookingUrl} className="btn btn-light mt-10" target="_blank" rel="noopener">
            Book a 15-minute call now
          </a>
        )}
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInput={(e) => e.target.name === 'name' && setSignature(e.target.value.trim())}
      className="letter [color-scheme:dark]"
    >
      <div className="letter-text">
        <p className="text-white">Hi Jacob,</p>

        <p className="mt-5">
          I’m{' '}
          <span className="whitespace-nowrap">
            <input name="name" required maxLength={100} autoComplete="name" size={9} placeholder="your name" aria-label="Your name" className="blank" />,
          </span>{' '}
          and I need{' '}
          <span className="whitespace-nowrap">
            <Blank list={needs} name="need" label="What you need" placeholder="choose one" />.
          </span>
        </p>
        <p className="mt-3">
          My budget is <Blank list={budgets} name="budget" label="Budget" placeholder="choose a range" /> and I’d like to start{' '}
          <span className="whitespace-nowrap">
            <Blank list={timelines} name="timeline" label="When to start" placeholder="choose when" />.
          </span>
        </p>

        <label htmlFor="details" className="mt-3 block">
          Here’s the idea:
        </label>
        <textarea
          id="details"
          name="details"
          required
          minLength={10}
          maxLength={4000}
          rows={3}
          placeholder="What does your business do, and what should this do for it? Links welcome."
          className="blank blank-area"
        />

        <p className="mt-6">
          You can reach me at{' '}
          <span className="whitespace-nowrap">
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              size={15}
              placeholder="you@company.com"
              aria-label="Your email"
              className="blank"
            />
            .
          </span>
        </p>

        <p className="mt-6" aria-hidden="true">
          Thanks,
          <br />
          <span className={signature ? 'text-white' : 'text-white/25'}>{signature || 'your name'}</span>
        </p>
      </div>

      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-8 rounded-xl border border-coral/50 bg-coral/10 px-4 py-3 text-[#ffc7b8]">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-8">
        <button type="submit" className="btn btn-light" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send it'}
        </button>
        <p className="text-white/50">
          or email{' '}
          <a href={`mailto:${site.email}`} className="break-all text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  )
}
