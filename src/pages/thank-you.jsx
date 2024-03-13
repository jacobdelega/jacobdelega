import Head from 'next/head'
import { useRouter } from 'next/router'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function ThankYou() {
  const router = useRouter()
  const email = new URLSearchParams(router.query).get('email')
  return (
    <>
      <Head>
        <title>You’re subscribed - Spencer Sharp</title>
        <meta
          name="description"
          content="Thanks for subscribing to my newsletter."
        />
      </Head>
      <SimpleLayout
        title="Thanks for subscribing."
        intro={`We've sent a confirmation email to ${email}. You'll be notified when I publish something new, and you can unsubscribe at any time, no hard feelings.`}
      />
    </>
  )
}
