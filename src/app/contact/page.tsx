import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './ContactGrid.module.css'

export default function ContactPage() {
  return (
    <SiteGridLayout>
      {/* Full-page panel */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelMain}`}></section>
    </SiteGridLayout>
  )
}