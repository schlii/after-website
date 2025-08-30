'use client'
import React, { useState } from 'react'
import TourDatesPanel, { type TourDateEntry } from './TourDatesPanel'
import styles from './TabbedInfoPanel.module.css'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      const src = value.asset?._ref ? urlFor(value).width(600).url() : value.asset?.url
      return <img src={src} alt={value.alt || ''} style={{ maxWidth: '100%', height: 'auto' }} />
    },
  },
  marks: {
    textColor: ({ children, value }: any) => (
      <span style={{ color: value?.shade || '#000' }}>{children}</span>
    ),
    textAlign: ({ children, value }: any) => (
      <span style={{ display: 'block', textAlign: value?.align || 'left' }}>{children}</span>
    ),
    link: ({children, value}: any) => {
      const { href = '#', openInNewTab } = value || {}
      const rel = openInNewTab ? 'noopener noreferrer' : undefined
      const target = openInNewTab ? '_blank' : undefined
      return (
        <a href={href} target={target} rel={rel} style={{ color: '#0000EE', textDecoration: 'underline' }}>
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h3 style={{ fontSize: '1rem', margin: '0 0 .2rem' }}>{children}</h3>,
    h2: ({ children }: any) => <h4 style={{ fontSize: '.9rem', margin: '0 0 .2rem' }}>{children}</h4>,
    normal: ({ children, value }: any) => {
      let align: 'left' | 'center' | 'right' = 'left'
      if (value.style === 'center') align = 'center'
      if (value.style === 'right') align = 'right'
      return <p style={{ textAlign: align }}>{children}</p>
    },
    center: ({ children }: any) => <p style={{ textAlign: 'center' }}>{children}</p>,
    right: ({ children }: any) => <p style={{ textAlign: 'right' }}>{children}</p>,
  },
} as const

export interface NewsListItem {
  _id: string
  title: string
  date: string
  slug: string
}

interface Props {
  tourDates: TourDateEntry[] | null
  newsPosts?: NewsListItem[] | null
  newsRich?: any[] | null
  maxRows?: number
  compact?: boolean
}

const TabbedInfoPanel: React.FC<Props> = ({ tourDates, newsPosts, newsRich, maxRows, compact }) => {
  const [activeTab, setActiveTab] = useState<'tour' | 'news'>('tour')

  const renderNews = () => {
    if (newsRich?.length) {
      return (
        <div className={`${styles.content} ${styles.newsRichBox}`}>
          <PortableText value={newsRich} components={ptComponents} />
        </div>
      )
    }
    if (newsPosts?.length) {
      const list = maxRows ? newsPosts.slice(0, maxRows) : newsPosts
      return (
        <div className={`${styles.content} ${styles.newsList}`}> 
          {list.map(({ _id, title, date, slug }) => (
            <Link href={`/news/${slug}`} key={_id} className={styles.newsItem} prefetch>
              <time className={styles.newsDate} dateTime={date}>
                {new Date(date).toLocaleDateString(undefined, {
                  month: '2-digit',
                  day: '2-digit',
                })}
              </time>
              <span className={styles.newsTitle}>{title}</span>
            </Link>
          ))}
        </div>
      )
    }
    return <div className={styles.content}>No news yet.</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <button
          className={`${styles.tabButton} ${activeTab === 'tour' ? styles.tabButtonActive : styles.tabButtonInactive}`}
          onClick={() => setActiveTab('tour')}
        >
          tour
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'news' ? styles.tabButtonActive : styles.tabButtonInactive}`}
          onClick={() => setActiveTab('news')}
        >
          news
        </button>
      </div>
      {activeTab === 'tour' ? (
        <TourDatesPanel dates={tourDates} maxRows={maxRows} compact={compact} />
      ) : (
        renderNews()
      )}
    </div>
  )
}

export default TabbedInfoPanel
