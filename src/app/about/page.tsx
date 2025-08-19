import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './AboutGrid.module.css'
import { aboutQuery } from 'lib/sanity-queries'
import { fetchSanityDocument } from 'lib/sanity-fetch'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface AboutPageData {
  image1?: any
  image2?: any
  text1?: any
  text2?: any
}

export default async function AboutPage() {
  const { data } = await fetchSanityDocument<AboutPageData>(aboutQuery)

  return (
    <SiteGridLayout>
      {/* Image 1 */}
      <section className={`${pgStyles.panelCommon} ${pgStyles.panelImageVariant} ${grid.panel} ${grid.aboutImage1}`}>
        {data?.image1 && (
          <img
            src={urlFor(data.image1).width(600).height(800).url()}
            alt={data.image1.alt || 'Band'}
            className={pgStyles.panelImage}
          />
        )}
      </section>

      {/* Text 1 */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.aboutText1}`}>
        {data?.text1 && (
          <div className={pgStyles.panelBox}>
            {data.text1.map((block: any, i: number) => (
              <p key={i}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        )}
      </section>

      {/* Image 2 */}
      <section className={`${pgStyles.panelCommon} ${pgStyles.panelImageVariant} ${grid.panel} ${grid.aboutImage2}`}>
        {data?.image2 && (
          <img
            src={urlFor(data.image2).width(600).height(800).url()}
            alt={data.image2.alt || 'Band'}
            className={pgStyles.panelImage}
          />
        )}
      </section>

      {/* Text 2 */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.aboutText2}`}>
        {data?.text2 && (
          <div className={pgStyles.panelBox}>
            {data.text2.map((block: any, i: number) => (
              <p key={i}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        )}
      </section>
    </SiteGridLayout>
  )
}