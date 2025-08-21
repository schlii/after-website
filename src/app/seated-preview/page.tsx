export const dynamic = 'force-static'

import SeatedWidget from '@/components/SeatedWidget'

export default function SeatedPreviewPage() {
  return (
    <div style={{ width: '100%', height: '100vh', padding: '1rem', boxSizing: 'border-box' }}>
      <h1 style={{ fontFamily: 'sans-serif', marginBottom: '1rem' }}>Seated Ticket Widget Preview</h1>
      <div style={{ width: '100%', height: 'calc(100% - 2rem)' }}>
        <SeatedWidget />
      </div>
    </div>
  )
}
