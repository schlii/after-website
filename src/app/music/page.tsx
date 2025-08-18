import { SiteGridLayout } from '@/components/SiteGridLayout'
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import styles from '@/styles/SiteGrid.module.css'

export default function MusicPage() {
  return (
    <SiteGridLayout>
      <section className={`${styles.panelCommon} ${styles.fullPanel}`}>
        <AppleMusicPlayerClient showPlaylist />
      </section>
    </SiteGridLayout>
  )
}