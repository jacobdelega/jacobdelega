// Everything the page says lives here, so updating the site is mostly editing this file.

export const site = {
  name: 'Jacob Delega',
  email: 'jacobdelega@gmail.com',
  github: 'https://github.com/jacobdelega',
  linkedin: 'https://linkedin.com/in/jacobdelega',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
}

export const products = [
  {
    id: 'pixpost',
    name: 'PixPost',
    summary: 'Turns product photos into ready-to-post TikTok carousels in seconds.',
    image: { src: '/work/pixpost.jpg', width: 1600, height: 844, alt: 'The PixPost home page' },
    details: [
      {
        title: 'What it does',
        items: [
          'AI-generated content',
          'Viral hook recommendations',
          'Template support for automations',
          'One-tap export to TikTok and Instagram',
        ],
      },
      {
        title: 'Security and privacy',
        items: [
          'Passwordless, bot-protected sign-in',
          'Your uploads stay private',
          'Secure payments through Stripe',
          'Built-in abuse protection',
        ],
      },
    ],
    stack: ['Next.js', 'React', 'MongoDB', 'Stripe', 'Claude API', 'Vercel'],
    link: { href: 'https://pixpost.app', label: 'Visit pixpost.app' },
    tone: 'coral',
  },
  {
    id: 'mana',
    name: 'Mana',
    summary: 'A marketplace where brands find creators, pay safely and run every deal from offer to payout.',
    image: { src: '/work/mana-landing.jpg', width: 1600, height: 844, alt: 'The Mana home page' },
    details: [
      {
        title: 'What it does',
        items: ['Creator discovery', 'Verified Instagram and TikTok stats', 'Payments held in escrow', 'Built-in messaging'],
      },
      {
        title: 'Trust and safety',
        items: [
          'Verified creator accounts',
          'Identity-verified creator payouts',
          'Two-step verification',
          'Built-in dispute protection',
        ],
      },
    ],
    stack: ['Next.js', 'React', 'MongoDB', 'Stripe Connect', 'Auth.js', 'Vercel'],
    link: { href: 'https://www.trymana.app', label: 'Visit trymana.app' },
    tone: 'blue',
  },
]

export const automation = {
  title: 'AI automations',
  summary:
    'Workflows that take the repeat work off your plate. A content automation finds what’s getting views in your niche, writes and designs on-brand posts, and has new ones ready every day.',
  // Total views across the content automation's posts. The real total was about 150,000 on Nov 18, 2026;
  // Jacob chose to ship 500,000 on Nov 19, expecting it to get there. Keep it in line with the real count.
  stat: 500000,
  statLabel: 'organic views for a product',
  highlights: ['$0 in ads', 'New posts every day', 'Facts checked against real sources'],
  steps: ['Find what’s trending', 'Research', 'Write and design', 'Ready to post'],
}

export const website = {
  title: 'A website for your business',
  pricePrefix: 'From',
  price: '$600',
  priceNote: 'for a standard small-business site',
  includes: ['Up to 5 pages', 'Mobile-friendly', 'Copywriting help', 'Domain and hosting', 'SEO'],
  week: [
    { day: 'Day 1', title: 'Kickoff call', text: 'We talk through your business, the pages you need and the look you like.' },
    { day: 'Days 2–3', title: 'Design', text: 'You see the home page designed and tell me what to change.' },
    { day: 'Days 4–5', title: 'Build', text: 'Every page built, the contact form wired up, and checked on phones.' },
    { day: 'Day 6', title: 'Review', text: 'You click through the real site and send me your changes.' },
    { day: 'Day 7', title: 'Launch', text: 'Live on your domain, with visitor stats so you can see who comes by.' },
  ],
  cta: { label: 'Start my website', need: 'website', budget: '500-1000' },
}

export const custom = {
  title: 'Need something bigger?',
  who: 'I also build web apps, online tools and AI automations. Describe yours in a sentence and I’ll quote it.',
  // Example ideas typed out in the box, one after another.
  ideas: [
    'Turn our product photos into a TikTok post every day',
    'A booking page for my salon',
    'Email me a sales report every Monday',
    'Find new leads and add them to a spreadsheet',
    'A portal where clients can check their orders',
  ],
  proof: [
    { name: 'PixPost', what: 'AI design tool', img: '/work/pill-pixpost.jpg' },
    { name: 'Mana', what: 'Creator marketplace', img: '/work/pill-mana.jpg' },
    { name: 'Content automation', what: 'organic views', stat: true },
  ],
}

export const faqs = [
  ['How long does a website take?', 'About a week from our first call to launch for a standard site. Bigger sites get a date in the quote.'],
  ['What do I need to send you?', 'Your logo, some photos and a few lines about your business. I help with the rest of the words.'],
  ['Do I own the site?', 'Yes. The site, the domain and the code are yours.'],
  ['What if I need changes later?', 'Tell me what you need and I’ll quote it before doing anything.'],
]

// Options for the contact form, worded to finish the sentences in the letter.
// The API route checks answers against these and puts the labels in the email.
export const needs = [
  { value: 'website', label: 'a website' },
  { value: 'automation', label: 'an AI automation' },
  { value: 'other', label: 'something else' },
]

export const budgets = [
  { value: 'under-500', label: 'under $500' },
  { value: '500-1000', label: '$500 to $1,000' },
  { value: '1000-3000', label: '$1,000 to $3,000' },
  { value: '3000-plus', label: '$3,000 or more' },
  { value: 'unsure', label: 'not set yet' },
]

export const timelines = [
  { value: 'this-month', label: 'this month' },
  { value: '1-3-months', label: 'in the next few months' },
  { value: 'exploring', label: 'later, just exploring' },
]
