'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {bandTheme} from './src/sanity/theme'
import { env } from 'process'

// derive site url (must not end with slash)
const siteUrl = (env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  theme: bandTheme,
  title: 'After Band Website',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Presentation tool enables Visual Editing previews
    presentationTool({
      previewUrl: {
        initial: siteUrl,
        previewMode: {
          enable: `${siteUrl}/api/draft/enable`,
          disable: `${siteUrl}/api/draft/disable`,
        },
      },
      allowOrigins: [siteUrl, 'http://localhost:*'],
    }),
  ],
})
