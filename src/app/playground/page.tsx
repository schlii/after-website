import React from 'react'
import styles from './Playground.module.css'

const PlaygroundPage = () => {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.siteContainer}>
        <div className={styles.heroWrapper}>
          <img src="/bandpic.jpg" alt="Band" className={styles.panelImage} />
          <section className={`${styles.panelCommon} ${styles.panelImageVariant} ${styles.hero}`}>
            <h2>Hero Area</h2>
          </section>
        </div>
        <section className={`${styles.panelCommon} ${styles.panel}`}>
          <div className={`${styles.panelBox} ${styles.tourBox}`}>
            <header className={styles.tourHeader}>
              <p className={styles.tourLine1}>tour w/</p>
              <h3 className={styles.tourLine2}>kitty craft</h3>
            </header>
            <ul className={styles.tourList}>
              {[
                ['06/12/25', 'Austin, TX', 'Mohawk'],
                ['06/14/25', 'Dallas, TX', 'Granada Theater'],
                ['06/18/25', 'Atlanta, GA', 'Terminal West'],
                ['06/21/25', 'Chicago, IL', 'Metro'],
                ['06/25/25', 'Brooklyn, NY', 'Warsaw'],
              ].map(([date, city, venue]) => (
                <li key={date + city}>
                  <span className={styles.date}>{date}</span>
                  <span className={styles.city}>{city}</span>
                  <span className={styles.venue}>{venue}</span>
                  <a href="#" className={styles.tix}>tickets</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <nav className={`${styles.panelCommon} ${styles.nav}`}>
          Music Player
        </nav>
      </div>
    </main>
  )
}

export default PlaygroundPage
