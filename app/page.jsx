import { Fragment } from 'react'
import Image from 'next/image'
import { site, products, automation } from './content'
import Clock from './components/Clock'
import CountUp from './components/CountUp'
import Flow from './components/Flow'
import ContactForm from './components/ContactForm'
import Pricing from './components/Pricing'

const wrap = 'mx-auto w-full max-w-[1200px] px-4 sm:px-8'

// The headline shows a small animated drawing of each kind of work before its name.
const headline = [
  'I',
  'build',
  { pill: 'browser', tilt: -5 },
  'websites,',
  { pill: 'switch', tilt: 4 },
  'apps',
  'and',
  { pill: 'flow', tilt: -3 },
  'AI',
  'automations',
  'that',
  'real',
  'customers',
  'use.',
]

const tones = {
  coral: { panel: 'bg-coral-tint', link: 'text-coral' },
  blue: { panel: 'bg-blue-tint', link: 'text-blue' },
}

// Websites: a browser window that builds a page. Apps: a switch that flips on.
// AI automations: dots that pulse in turn.
function Pill({ kind, style }) {
  return (
    <span className={`pill pill-${kind} pop`} style={style} aria-hidden="true">
      {kind === 'browser' && (
        <svg viewBox="0 0 200 100">
          <rect x="46" y="14" width="108" height="100" rx="10" fill="#fff" />
          <circle cx="58" cy="26" r="3.5" fill="#d9dce5" />
          <circle cx="68" cy="26" r="3.5" fill="#d9dce5" />
          <circle cx="78" cy="26" r="3.5" fill="#d9dce5" />
          <rect className="pb pb-1" x="58" y="40" width="58" height="10" rx="5" fill="#0e1020" />
          <rect className="pb pb-2" x="58" y="57" width="82" height="6" rx="3" fill="#d4d7e0" />
          <rect className="pb pb-3" x="58" y="71" width="36" height="13" rx="6.5" fill="#ff5b37" />
        </svg>
      )}
      {kind === 'switch' && (
        <>
          <span className="sw-track" />
          <span className="sw-knob">
            <svg viewBox="0 0 20 20">
              <path d="M5 10.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </>
      )}
      {kind === 'flow' && (
        <span className="pill-dots">
          <i />
          <i />
          <i />
        </span>
      )}
    </span>
  )
}

function Headline() {
  return (
    <h1 className="max-w-[17ch] font-display text-[clamp(2.7rem,7.6vw,6.6rem)] leading-[1.02] font-bold tracking-[-0.035em]">
      {headline.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {typeof item === 'string' ? (
            <span className="word rise" style={{ '--d': i }}>
              {item}
            </span>
          ) : (
            <Pill kind={item.pill} style={{ '--d': i, rotate: `${item.tilt}deg` }} />
          )}
        </Fragment>
      ))}
    </h1>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 flex-none" aria-hidden="true">
      <path d="M5 10.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-white/80 backdrop-blur-md">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="/" className="font-display text-lg font-bold tracking-tight">
            {site.name}
          </a>
          <nav className="flex items-center gap-7 text-[0.95rem]" aria-label="Main">
            <a href="#work" className="hidden text-muted hover:text-ink sm:inline">
              Work
            </a>
            <a href="#pricing" className="hidden text-muted hover:text-ink sm:inline">
              Pricing
            </a>
            <a href="#contact" className="rounded-full bg-ink px-4 py-2 font-semibold text-white hover:bg-[#262a44]">
              Start a project
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className={`${wrap} pt-14 pb-24 sm:pt-20 md:pt-28 md:pb-36`}>
          <div className="fade-in flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 font-semibold text-ink">
              <span className="live-dot" aria-hidden="true" />
              Taking new projects
            </span>
            <Clock />
          </div>

          <div className="mt-8">
            <Headline />
          </div>

          <div className="fade-in mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[36rem] text-lg leading-relaxed text-muted sm:text-xl md:col-span-7">
              Hi, I’m Jacob, a software engineer in New Jersey. I work with small businesses and founders, a few
              projects at a time, and I reply within two days.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
              <a href="#contact" className="btn">
                Tell me about your project
              </a>
              <a href="#work" className="btn-ghost">
                See the work
              </a>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="pb-24 md:pb-32">
          <div className={wrap}>
            <h2 className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">Things I’ve built</h2>
            <p className="mt-4 max-w-[34rem] text-lg text-muted">
              Two products with real users, and the automation behind {automation.stat.toLocaleString('en-US')}+ organic views.
            </p>

            <div className="mt-14 space-y-6 md:space-y-8">
              {products.map((p) => {
                const t = tones[p.tone]
                return (
                  <article
                    key={p.id}
                    className={`grid grid-cols-1 gap-10 overflow-hidden rounded-[28px] p-6 sm:p-10 md:grid-cols-12 md:gap-8 md:p-12 ${t.panel}`}
                  >
                    <div className="flex min-w-0 flex-col md:col-span-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{p.name}</h3>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold">
                          <span className="live-dot" aria-hidden="true" />
                          Live
                        </span>
                      </div>
                      <p className="mt-5 max-w-[26rem] text-lg leading-relaxed sm:text-xl">{p.summary}</p>
                      {p.highlights && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {p.highlights.map((h) => (
                          <li key={h} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium">
                            {h}
                          </li>
                        ))}
                      </ul>
                      )}
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener"
                        className={`mt-8 inline-flex w-fit items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] md:mt-auto md:pt-10 ${t.link}`}
                      >
                        {p.link.label}
                      </a>
                    </div>
                    <div className="min-w-0 md:col-span-7">
                      <div className="browser settle">
                        <div className="flex items-center gap-1.5 border-b border-line bg-[#f7f7f9] px-4 py-2.5">
                          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="size-2.5 rounded-full bg-[#febc2e]" />
                          <span className="size-2.5 rounded-full bg-[#28c840]" />
                          <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-xs text-muted">
                            {p.link.href.replace(/^https:\/\/(www\.)?/, '')}
                          </span>
                        </div>
                        <Image
                          src={p.image.src}
                          width={p.image.width}
                          height={p.image.height}
                          alt={p.image.alt}
                          sizes="(min-width: 768px) 680px, 100vw"
                          className="h-auto w-full"
                        />
                      </div>
                    </div>
                    {p.details && (
                      <div className="grid grid-cols-1 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2 md:col-span-12 lg:grid-cols-3 lg:gap-10">
                        {p.details.map((group) => (
                          <div key={group.title}>
                            <p className="font-semibold">{group.title}</p>
                            <ul className="mt-4 space-y-2.5">
                              {group.items.map((item) => (
                                <li key={item} className="flex gap-2.5">
                                  <span className={t.link}>
                                    <Check />
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {p.stack && (
                          <div className="sm:col-span-2 lg:col-span-1">
                            <p className="font-semibold">Built with</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {p.stack.map((tech) => (
                                <li key={tech} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium">
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                )
              })}

              <article className="grid grid-cols-1 gap-12 overflow-hidden rounded-[28px] bg-night p-6 text-white sm:p-10 md:grid-cols-12 md:gap-8 md:p-12">
                <div className="min-w-0 md:col-span-7">
                  <h3 className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{automation.title}</h3>
                  <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-white/75 sm:text-xl">
                    {automation.summary}
                  </p>
                  <p className="mt-10 font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-none font-bold tracking-[-0.04em]">
                    <CountUp value={automation.stat} />
                  </p>
                  <p className="mt-3 max-w-[22rem] text-lg text-white/75">{automation.statLabel}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {automation.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0 md:col-span-5 md:self-center">
                  <Flow steps={automation.steps} />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-soft py-24 md:py-32">
          <div className={wrap}>
            <h2 className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">Ways to work together</h2>
            <p className="mt-4 max-w-[34rem] text-lg text-muted">One clear price for a website, and a free call for anything bigger.</p>

            <Pricing />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-ink pt-24 text-white md:pt-32">
          <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="max-w-[12ch] font-display text-5xl leading-[1.02] font-bold tracking-[-0.035em] sm:text-7xl lg:text-[4.25rem]">
                  Got a project? Let’s talk.
                </h2>
                <p className="mt-8 flex items-center gap-2.5 text-white/60">
                  <span className="live-dot" aria-hidden="true" />
                  <Clock />
                </p>
                <p className="mt-1.5 text-white/60">I reply within two days.</p>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          <footer className={`${wrap} mt-28 overflow-hidden pb-8`}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-6 text-sm text-white/50">
              <p>© {new Date().getFullYear()} {site.name}</p>
              <ul className="flex gap-6">
                <li>
                  <a href={site.github} className="hover:text-white">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <p
              className="mt-10 font-display text-[clamp(3rem,14.5vw,12.5rem)] leading-[0.8] font-bold tracking-[-0.05em] whitespace-nowrap text-white/[0.07] select-none"
              aria-hidden="true"
            >
              Jacob Delega
            </p>
          </footer>
        </section>
      </main>
    </>
  )
}
