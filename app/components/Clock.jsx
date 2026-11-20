'use client'

import { useEffect, useState } from 'react'

const format = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
})

// Jacob's local time, so visitors know when a reply is likely.
export default function Clock({ className = '' }) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()).toLowerCase())
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {time ? `${time} in New Jersey` : 'Based in New Jersey'}
    </span>
  )
}
