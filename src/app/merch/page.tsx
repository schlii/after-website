import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './MerchGrid.module.css'

export default function MerchPage() {
  return (
    <SiteGridLayout>
      {/* Banner */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.bannerPanel}`}></section>

      {/* Product panels */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel1}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel2}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel3}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel4}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel5}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel6}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel7}`}></section>
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel8}`}></section>

      {/* Policy links */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.policyLinksPanel}`}></section>
    </SiteGridLayout>
    
  )
}