import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './AboutGrid.module.css'

export default function AboutPage() {
  return (
    <SiteGridLayout>
      {/* Panel A */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelA}`}></section>

      {/* Panel B */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelB}`}></section>

      {/* Panel C */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelC}`}></section>

      {/* Panel D */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelD}`}></section>
    </SiteGridLayout>
  )
}