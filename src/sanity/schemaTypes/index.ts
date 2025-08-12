import { type SchemaTypeDefinition } from 'sanity'

import tourDate from './tour-date'
import newsPost from './news-post'
import bandMember from './band-member'
import contactSubmission from './contact-submission'
import siteSettings from './site-settings'
import appleMusicSettings from './apple-music-settings'
import user from './user'
import youtube from './youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    tourDate,
    newsPost,
    bandMember,
    contactSubmission,
    siteSettings,
    appleMusicSettings,
    user,
    youtube,
  ],
}