import React from 'react'
import styles from './TourDatesPanel.module.css'

export interface TourDateEntry {
  _id: string
  date: string
  location?: string | null
  city?: string | null
  country?: string | null
  ticketUrl?: string | null
}

interface Props {
  dates: TourDateEntry[] | null
  maxRows?: number
  compact?: boolean
}

function formatDate(dateStr: string, showYear = true): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  const options: Intl.DateTimeFormatOptions = showYear
    ? { year: 'numeric', month: '2-digit', day: '2-digit' }
    : { month: '2-digit', day: '2-digit' }
  return d.toLocaleDateString(undefined, options)
}

const TourDatesPanel: React.FC<Props> = ({ dates, maxRows, compact = false }) => {
  if (!dates?.length) return <div className={styles.container}>No upcoming shows.</div>
  const list = maxRows ? dates.slice(0, maxRows) : dates
  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''}`}>
      {list.map(({ _id, date, location, city, country, ticketUrl }) => {
        const loc = location ?? [city, country].filter(Boolean).join(', ')
        return (
        <div key={_id} className={styles.row}>
          <div className={styles.capsule}>
            <span className={styles.date}>{formatDate(date, !compact)}</span>
            <span className={styles.divider} />
            <span className={styles.location}>{loc}</span>
          </div>
          {ticketUrl ? (
            <a href={ticketUrl} target="_blank" rel="noreferrer" className={styles.tix}>
              tickets
            </a>
          ) : (
            <span className={`${styles.tix} ${styles.tixDisabled}`}>tickets</span>
          )}
        </div>
      )})}
    </div>
  )
}

export default TourDatesPanel
