import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './ContactGrid.module.css'
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <SiteGridLayout>
      {/* Full-page panel */}
      <section className={`${pgStyles.panelCommon} ${grid.panel} ${grid.panelMain} flex items-center justify-center p-8`}>
        <div className={`${pgStyles.panelBox} ${pgStyles.tourBox} w-full`}>
          <h1 className="text-center text-black mt-4 mb-6 text-3xl font-regular lowercase" style={{fontFamily:'PixdorTwo, var(--font-mono)'}}>contact us</h1>
          <ContactForm />
        </div>
      </section>
    </SiteGridLayout>
  )
}