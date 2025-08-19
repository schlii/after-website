import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) => {
  const hiddenTypes = [
    'global',
    'home',
    'tour',
    'merch',
    'music',
    'about',
    'contact',
    'appleMusicSettings',
    'tourDate',
  ]

  return S.list()
    .title('Content')
    .items([
      // Global
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global')
            .items([
              S.listItem()
                .title('Global Settings')
                .id('global')
                .child(S.document().schemaType('global').documentId('global')),
            ])
        ),

      // Home
      S.listItem()
        .title('Home')
        .id('home')
        .child(S.document().schemaType('home').documentId('home')),

      // Tour (page + dates)
      S.listItem()
        .title('Tour')
        .child(
          S.list()
            .title('Tour')
            .items([
              S.listItem()
                .title('Tour Page')
                .id('tour')
                .child(S.document().schemaType('tour').documentId('tour')),
              S.documentTypeListItem('tourDate').title('Tour Dates'),
            ])
        ),

      // Merch
      S.listItem()
        .title('Merch')
        .id('merch')
        .child(S.document().schemaType('merch').documentId('merch')),

      // Music (page + Apple settings)
      S.listItem()
        .title('Music')
        .child(
          S.list()
            .title('Music')
            .items([
              S.listItem()
                .title('Music Page')
                .id('music')
                .child(S.document().schemaType('music').documentId('music')),
              S.listItem()
                .title('Apple Music Settings')
                .id('appleMusicSettings')
                .child(S.document().schemaType('appleMusicSettings').documentId('appleMusicSettings')),
            ])
        ),

      // About (page + band info)
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('About Page')
                .id('about')
                .child(S.document().schemaType('about').documentId('about')),
              // Band Info singleton removed; About Page now covers this content.
            ])
        ),

      // Contact
      S.listItem()
        .title('Contact')
        .id('contact')
        .child(S.document().schemaType('contact').documentId('contact')),

      // Divider
      S.divider(),

      // Fallback for other types
      ...S.documentTypeListItems().filter((listItem) => !hiddenTypes.includes(listItem.getId() ?? '')),
    ])
}
