import { type SchemaTypeDefinition } from 'sanity'

import tourDate from './tour-date'
import newsPost from './news-post'
import song from './song'
import bandMember from './band-member'
import contactSubmission from './contact-submission'
import siteSettings from './site-settings'
import user from './user'
import youtube from './youtube'
import spotify from './spotify'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    tourDate,
    newsPost,
    song,
    bandMember,
    contactSubmission,
    siteSettings,
    user,
    youtube,
    spotify,
  ],
}