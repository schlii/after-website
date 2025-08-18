import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './TourGrid.module.css'

export default function TourPage() {
  return (
    <SiteGridLayout>
      {/* Main content panel placeholder */}
      <section className={`${pgStyles.panelCommon} ${grid.mainContent}`}>Main Tour Content</section>

      {/* Photo panels – currently empty placeholders */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelA}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelB}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelC}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelD}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelE}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelF}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelG}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelH}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelI}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelJ}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelK}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelL}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelM}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelN}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelO}`}></section>
    </SiteGridLayout>
  )
}