# jacobdelega.com

One-page site for client work. Next.js 16, Tailwind 4, deployed on Vercel.

## Edit the content

Almost everything the page says is in `app/content.js`: the products, the automation, the offers and prices, the steps, and the contact-form options. Images live in `public/`.

## Contact form

The form posts to `app/api/contact/route.js`, which emails each enquiry to you through [Resend](https://resend.com). Set these in Vercel (Project → Settings → Environment Variables) and in `.env.local` for local testing; see `.env.example`.

| Variable | What it is |
|---|---|
| `RESEND_API_KEY` | A Resend API key |
| `CONTACT_TO_EMAIL` | Where enquiries go |
| `CONTACT_FROM_EMAIL` | A sender on a domain verified in Resend |
| `NEXT_PUBLIC_BOOKING_URL` | Optional Cal.com or Calendly link, shown after someone sends the form |

Without the first three, the form tells visitors to email you instead.

## Run it

```bash
npm install
npm run dev
```
