/**
 * Test script to verify Shopify API connection
 * Run with: npx tsx scripts/test-shopify-connection.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

import client, { shopifyHelpers } from '../lib/shopify'

async function testShopifyConnection() {
  console.log('🛍️  Testing Shopify API connection...\n')

  try {
    // Test 1: Basic client connection
    console.log('✅ Shopify client initialized successfully')
    console.log(`📍 Connected to: ${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`)
    
    // Test 2: Fetch shop information
    console.log('\n🏪 Fetching shop information...')
    const shop = await client.shop.fetchInfo()
    console.log(`Shop Name: ${shop.name}`)
    console.log(`Shop Description: ${shop.description || 'No description'}`)
    console.log(`Currency: ${shop.currencyCode}`)
    
    // Test 3: Fetch products
    console.log('\n📦 Fetching products...')
    const products = await shopifyHelpers.fetchProducts()
    console.log(`Found ${products.length} products`)
    
    if (products.length > 0) {
      console.log('\nFirst product details:')
      const firstProduct = products[0]
      console.log(`- Title: ${firstProduct.title}`)
      console.log(`- Handle: ${firstProduct.handle}`)
      console.log(`- Price: ${firstProduct.variants[0]?.price || 'No price'}`)
      console.log(`- Available: ${firstProduct.availableForSale}`)
    } else {
      console.log('⚠️  No products found. You might want to add some test products in your Shopify admin.')
    }
    
    // Test 4: Create a test checkout
    console.log('\n🛒 Testing checkout creation...')
    const checkout = await shopifyHelpers.createCheckout()
    console.log(`✅ Checkout created with ID: ${checkout.id}`)
    console.log(`Checkout URL: ${checkout.webUrl}`)
    
    console.log('\n🎉 All tests passed! Shopify integration is working correctly.')
    
  } catch (error) {
    console.error('\n❌ Error testing Shopify connection:')
    console.error(error)
    
    if (error instanceof Error) {
      if (error.message.includes('Missing required environment variables')) {
        console.log('\n💡 Make sure you have added the environment variables to your .env.local file:')
        console.log('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=du44gb-5q.myshopify.com')
        console.log('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=de60e7d79b8989e677ebab6f959cfede')
      }
    }
  }
}

// Run the test
testShopifyConnection()