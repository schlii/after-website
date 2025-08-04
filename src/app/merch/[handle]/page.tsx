import { notFound } from 'next/navigation'
import { serialiseProduct } from '../../../../lib/serialiseShopify'
import { shopifyHelpers } from '../../../../lib/shopify'
import { ProductGallery } from '../../../components/ProductGallery'
import { ProductDetailClient } from '../../../components/ProductDetailClient'
import { type PlainProduct } from '../../../../types/PlainProduct'

interface PageProps {
  params: { handle: string }
}

export async function generateMetadata({ params }: PageProps) {
  const raw = await shopifyHelpers.fetchProductByHandle(params.handle)
  if (!raw) return { title: 'Product not found' }
  return {
    title: raw.title,
    description: raw.description?.substring(0, 150) ?? '',
    openGraph: {
      images: raw.images?.[0]?.src ? [{ url: raw.images[0].src }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const rich = await shopifyHelpers.fetchProductByHandle(params.handle)
  if (!rich) notFound()

  const product: PlainProduct = serialiseProduct(rich)
  const images = (rich.images ?? []).map((img: any) => ({
    src: img.src,
    altText: img.altText ?? null,
  }))

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Gallery (purely visual, server-rendered) */}
        <ProductGallery images={images} />

        {/* Interactive details handled on client side */}
        <ProductDetailClient product={product} />
      </div>

      {/* Product description */}
      {rich.descriptionHtml && (
        <div style={{ marginTop: '2rem' }} dangerouslySetInnerHTML={{ __html: rich.descriptionHtml }} />
      )}
    </div>
  )
}
