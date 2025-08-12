import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings Section
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Apple Music Settings')
                .id('appleMusicSettings')
                .child(
                  S.document()
                    .schemaType('appleMusicSettings')
                    .documentId('appleMusicSettings')
                ),
              S.listItem()
                .title('Site Settings')
                .id('siteSettings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
            ])
        ),
      
      // Divider
      S.divider(),
      
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'appleMusicSettings'].includes(listItem.getId() ?? '')
      ),
    ])
