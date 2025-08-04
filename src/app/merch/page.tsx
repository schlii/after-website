import { shopifyHelpers } from '../../../lib/shopify'
import { ProductGrid } from '../../components/ProductGrid'
import { serialiseProducts } from '../../../lib/serialiseShopify'
import { type PlainProduct } from '../../../types/PlainProduct'

export default async function MerchPage() {
  let products = []
  let error = null

  try {
    const rawProducts = await shopifyHelpers.fetchProducts()
    products = serialiseProducts(rawProducts) as PlainProduct[]
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load products'
    console.error('Error fetching products:', err)
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Merchandise
          </h1>
          
          {error ? (
            <div className="text-center">
              <p className="text-red-400 text-lg">
                Error loading products: {error}
              </p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </div>
  );
}