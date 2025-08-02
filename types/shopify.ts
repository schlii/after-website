/**
 * TypeScript interfaces for Shopify Storefront API
 */

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  productType: string
  vendor: string
  tags: string[]
  availableForSale: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  onlineStoreUrl: string
  variants: ShopifyProductVariant[]
  images: ShopifyImage[]
  options: ShopifyProductOption[]
}

export interface ShopifyProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice: string | null
  availableForSale: boolean
  sku: string | null
  barcode: string | null
  weight: number | null
  weightUnit: string
  requiresShipping: boolean
  taxable: boolean
  image: ShopifyImage | null
  selectedOptions: ShopifySelectedOption[]
}

export interface ShopifyImage {
  id: string
  src: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyProductOption {
  id: string
  name: string
  values: string[]
}

export interface ShopifySelectedOption {
  name: string
  value: string
}

export interface ShopifyCheckout {
  id: string
  webUrl: string
  subtotalPrice: string
  totalTax: string
  totalPrice: string
  completedAt: string | null
  createdAt: string
  updatedAt: string
  email: string | null
  discountApplications: ShopifyDiscountApplication[]
  appliedGiftCards: ShopifyAppliedGiftCard[]
  shippingAddress: ShopifyMailingAddress | null
  shippingLine: ShopifyShippingRate | null
  customAttributes: ShopifyAttribute[]
  note: string | null
  lineItems: ShopifyLineItem[]
  order: ShopifyOrder | null
  orderStatusUrl: string | null
  taxExempt: boolean
  taxesIncluded: boolean
  currencyCode: string
  totalDuties: string | null
  paymentDue: string
  ready: boolean
  requiresShipping: boolean
}

export interface ShopifyLineItem {
  id: string
  title: string
  variant: ShopifyProductVariant
  quantity: number
  customAttributes: ShopifyAttribute[]
  discountAllocations: ShopifyDiscountAllocation[]
}

export interface ShopifyDiscountApplication {
  targetSelection: string
  allocationMethod: string
  targetType: string
  description: string | null
  value: string
  valueType: string
  title: string
  applicable: boolean
}

export interface ShopifyAppliedGiftCard {
  id: string
  amountUsed: string
  balance: string
  lastCharacters: string
}

export interface ShopifyMailingAddress {
  id: string | null
  address1: string | null
  address2: string | null
  city: string | null
  company: string | null
  country: string | null
  countryCode: string | null
  firstName: string | null
  formatted: string[]
  lastName: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  province: string | null
  provinceCode: string | null
  zip: string | null
}

export interface ShopifyShippingRate {
  handle: string
  price: string
  title: string
}

export interface ShopifyAttribute {
  key: string
  value: string
}

export interface ShopifyDiscountAllocation {
  allocatedAmount: string
  discountApplication: ShopifyDiscountApplication
}

export interface ShopifyOrder {
  id: string
  processedAt: string
  orderNumber: number
  totalPrice: string
  totalRefunded: string
  currencyCode: string
  totalShippingPrice: string
  subtotalPrice: string
  totalTax: string
}

export interface ShopifyShop {
  id: string
  name: string
  description: string | null
  moneyFormat: string
  currencyCode: string
  primaryDomain: string
  paymentSettings: {
    currencyCode: string
    countryCode: string
    enabledPresentmentCurrencies: string[]
  }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  updatedAt: string
  image: ShopifyImage | null
  products: ShopifyProduct[]
}

// Cart-related types for our application
export interface CartItem {
  id: string
  productId: string
  variantId: string
  title: string
  handle: string
  image: ShopifyImage | null
  price: string
  quantity: number
  variant: {
    id: string
    title: string
    selectedOptions: ShopifySelectedOption[]
  }
}

export interface Cart {
  items: CartItem[]
  totalQuantity: number
  totalPrice: string
  checkoutId: string | null
  checkoutUrl: string | null
}

// API Response types
export interface ShopifyApiResponse<T> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}

// Error types
export interface ShopifyError {
  message: string
  field?: string[]
  code?: string
}

// Webhook types (for future use)
export interface ShopifyWebhook {
  id: string
  topic: string
  api_version: string
  created_at: string
  updated_at: string
}