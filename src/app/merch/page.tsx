import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './MerchGrid.module.css'
import { shopifyHelpers } from 'lib/shopify'
import { serialiseProducts } from 'lib/serialiseShopify'
import { ProductGrid } from '@/components/ProductGrid'

export const revalidate = 300 // 5-minute ISR

export default async function MerchPage() {
  const productsRich = await shopifyHelpers.fetchProducts()
  const products = serialiseProducts(productsRich)

  return (
    <SiteGridLayout>
      {/* Single scrollable product panel */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.productPanel1}`}> 
        <div className={`${pgStyles.panelBox} ${grid.merchBox}`}>
          <div className={grid.scrollContainer}>
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </SiteGridLayout>
    
  )
}