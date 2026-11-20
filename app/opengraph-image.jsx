import { ImageResponse } from 'next/og'

export const alt = 'Jacob Delega builds websites, apps and AI automations that real customers use'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#0e1020',
          padding: 72,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700 }}>Jacob Delega</div>
        <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: 980 }}>
          I build websites, apps and AI automations that real customers use.
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ background: '#0e1020', color: '#ffffff', borderRadius: 999, padding: '12px 26px', fontSize: 30, fontWeight: 700 }}>
            Taking new projects
          </div>
        </div>
      </div>
    ),
    size,
  )
}
