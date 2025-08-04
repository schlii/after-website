export interface PlainProductVariant {
  id: string
  title: string
  price: string
  available: boolean
}

export interface PlainProduct {
  id: string
  handle: string
  title: string
  price: string
  available: boolean
  image: {
    src: string
    alt: string | null
  } | null
  productType?: string
  vendor?: string
  variants: PlainProductVariant[]
}
