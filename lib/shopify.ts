import Client from 'shopify-buy'

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key, _]) => key)

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  )
}

// Initialize Shopify client
const client = Client.buildClient({
  domain: requiredEnvVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  storefrontAccessToken: requiredEnvVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
})

export default client

// Helper functions for common operations
export const shopifyHelpers = {
  /**
   * Fetch all products
   */
  async fetchProducts() {
    try {
      const products = await client.product.fetchAll()
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Failed to fetch products')
    }
  },

  /**
   * Fetch a single product by ID
   */
  async fetchProduct(productId: string) {
    try {
      const product = await client.product.fetch(productId)
      return product
    } catch (error) {
      console.error('Error fetching product:', error)
      throw new Error('Failed to fetch product')
    }
  },

  /**
   * Fetch a product by handle (URL slug)
   */
  async fetchProductByHandle(handle: string) {
    try {
      const products = await client.product.fetchQuery({
        query: `title:${handle} OR handle:${handle}`,
        first: 1
      })
      return products[0] || null
    } catch (error) {
      console.error('Error fetching product by handle:', error)
      throw new Error('Failed to fetch product by handle')
    }
  },

  /**
   * Create checkout
   */
  async createCheckout() {
    try {
      const checkout = await client.checkout.create()
      return checkout
    } catch (error) {
      console.error('Error creating checkout:', error)
      throw new Error('Failed to create checkout')
    }
  },

  /**
   * Add items to checkout
   */
  async addToCheckout(checkoutId: string, lineItemsToAdd: any[]) {
    try {
      const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
      return checkout
    } catch (error) {
      console.error('Error adding items to checkout:', error)
      throw new Error('Failed to add items to checkout')
    }
  },

  /**
   * Update checkout line items
   */
  async updateCheckout(checkoutId: string, lineItemsToUpdate: any[]) {
    try {
      const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
      return checkout
    } catch (error) {
      console.error('Error updating checkout:', error)
      throw new Error('Failed to update checkout')
    }
  },

  /**
   * Remove items from checkout
   */
  async removeFromCheckout(checkoutId: string, lineItemIds: string[]) {
    try {
      const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIds)
      return checkout
    } catch (error) {
      console.error('Error removing items from checkout:', error)
      throw new Error('Failed to remove items from checkout')
    }
  },

  /**
   * Fetch checkout by ID
   */
  async fetchCheckout(checkoutId: string) {
    try {
      const checkout = await client.checkout.fetch(checkoutId)
      return checkout
    } catch (error) {
      console.error('Error fetching checkout:', error)
      throw new Error('Failed to fetch checkout')
    }
  }
}

// Export types for TypeScript usage
export type {
  ShopifyProduct,
  ShopifyCheckout,
  ShopifyLineItem,
  ShopifyProductVariant,
  CartItem,
  Cart
} from '../types/shopify'