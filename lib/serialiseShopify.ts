import { type ShopifyProduct } from '../types/shopify'
import { type PlainProduct, type PlainProductVariant } from '../types/PlainProduct'

/**
 * Convert rich Shopify SDK product objects into plain serialisable DTOs
 */
export function serialiseProduct(product: ShopifyProduct): PlainProduct {
  const firstImage = product.images?.[0] ?? null
  const firstVariant = product.variants?.[0]

  const variants: PlainProductVariant[] = product.variants?.map((v) => ({
    id: v.id,
    title: v.title,
    price: typeof v.price === 'string' ? v.price : (v.price as any)?.amount ?? '0.00',
    available: v.availableForSale,
  })) ?? []

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    price: typeof firstVariant?.price === 'string' ? firstVariant?.price : (firstVariant?.price as any)?.amount ?? '0.00',
    available: product.availableForSale,
    image: firstImage
      ? {
          src: firstImage.src,
          alt: firstImage.altText ?? null,
        }
      : null,
    productType: product.productType,
    vendor: product.vendor,
    variants,
  }
}

export function serialiseProducts(products: ShopifyProduct[]): PlainProduct[] {
  return products.map(serialiseProduct)
}
