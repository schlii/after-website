"use client"
import { useEffect, useState } from 'react'
import styles from './PageLoader.module.css'

export default function PageLoader () {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => { setHidden(true) }, 500)
    return () => { clearTimeout(t) }
  }, [])

  return (
    <div className={hidden ? `${styles.loaderWrapper} ${styles.hidden}` : styles.loaderWrapper}>
      <p className={styles.message}>Dreaming<span /></p>
    </div>
  )
}
