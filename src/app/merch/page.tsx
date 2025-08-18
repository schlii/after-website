import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './MerchGrid.module.css'

export default function MerchPage() {
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

      {/* Panel E */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelE}`}></section>

      {/* Panel F */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelF}`}></section>

      {/* Panel G */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelG}`}></section>

      {/* Panel H */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelH}`}></section>

      {/* Panel I */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelI}`}></section>

      {/* Panel J */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelJ}`}></section>
    </SiteGridLayout>
    
  )
}