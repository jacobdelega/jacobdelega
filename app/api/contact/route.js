import { site, needs, budgets, timelines } from '../../content'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fail(error, status = 400) {
  return Response.json({ error }, { status })
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function labelFor(list, value) {
  return list.find((o) => o.value === value)?.label
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return fail('The form data was unreadable. Refresh the page and try again.')
  }

  // Bots fill in the hidden field; pretend it worked.
  if (clean(body.company, 200)) return Response.json({ ok: true })

  const name = clean(body.name, 100).replace(/[\r\n]+/g, ' ')
  const email = clean(body.email, 200)
  const details = clean(body.details, 4000)
  const need = labelFor(needs, body.need)
  const budget = labelFor(budgets, body.budget)
  const timeline = labelFor(timelines, body.timeline)

  if (!name) return fail('Add your name.')
  if (!EMAIL.test(email)) return fail('Add an email address I can reply to.')
  if (!need) return fail('Choose what you need.')
  if (!budget) return fail('Choose a budget range.')
  if (!timeline) return fail('Choose when you need it.')
  if (details.length < 10) return fail('Add a sentence or two about the project.')

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!key || !to || !from) {
    console.error('Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL')
    return fail(`The form isn’t connected yet. Email me at ${site.email} instead.`, 503)
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Need: ${need}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    '',
    details,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New project: ${need}, ${budget} (${name})`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return fail(`Your message didn’t send. Email me at ${site.email} instead.`, 502)
  }

  return Response.json({ ok: true })
}
