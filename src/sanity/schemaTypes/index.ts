import { type SchemaTypeDefinition } from 'sanity'

import tourDate from './tour-date'
import newsPost from './news-post'
import siteSettings from './site-settings'
import homePage from './home-page'
import aboutPage from './about-page'
import merchPage from './merch-page'
import tourPage from './tour-page'
import contactPage from './contact-page'
import musicPage from './music-page'
import appleMusicSettings from './apple-music-settings'
import user from './user'
import youtube from './youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    tourDate,
    newsPost,
    siteSettings,
    homePage,
    aboutPage,
    merchPage,
    tourPage,
    contactPage,
    musicPage,
    appleMusicSettings,
    user,
    youtube,
  ],
}