'use client'

import { useEffect } from 'react'
import styles from './SeatedWidget.module.css'

/**
 * Seated ticketing widget wrapper
 * Renders the required <div> and injects the script once per page load.
 */
const WIDGET_SCRIPT_ID = 'seated-widget-script'

interface Props { instance?: 'home' | 'tour' }

export default function SeatedWidget({ instance = 'home' }: Props) {
  useEffect(() => {
    // Inject script only once
    if (!document.getElementById(WIDGET_SCRIPT_ID)) {
      const s = document.createElement('script')
      s.src = 'https://widget.seated.com/app.js'
      s.async = true
      s.id = WIDGET_SCRIPT_ID
      document.body.appendChild(s)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div
        id="seated-55fdf2c0"
        data-artist-id="05a969ca-6251-42a4-afe3-8492ed4510f9"
        data-css-version="3"
        className={styles.inner}
      />
    </div>
  )
}
