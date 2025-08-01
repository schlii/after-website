import { fetchSanityDocuments, fetchSanityDocument } from '../../../lib/sanity-server'
import { bandMembersQuery, siteSettingsQuery } from '../../../lib/sanity-queries'
import type { BandMember, SiteSettings } from '../../../types/sanity'

export default async function AboutPage() {
  // Fetch band members and site settings in parallel
  const [{ data: bandMembers, error: membersError }, { data: siteSettings, error: settingsError }] = 
    await Promise.all([
      fetchSanityDocuments<BandMember>(bandMembersQuery),
      fetchSanityDocument<SiteSettings>(siteSettingsQuery)
    ])

  // Sort band members by join date if available
  const sortedMembers = bandMembers?.sort((a, b) => {
    if (!a.join_date || !b.join_date) return 0
    return new Date(a.join_date).getTime() - new Date(b.join_date).getTime()
  }) || []

  return (
    <div className="min-h-screen">
      <section>
        <h1>About After</h1>

        {/* Band Bio */}
        <div>
          <h2>The Band</h2>
          {settingsError ? (
            <div role="alert">
              <p>Unable to load band information. Please try again later.</p>
            </div>
          ) : (
            <div>
              {siteSettings?.about_text || 'Band biography coming soon.'}
            </div>
          )}

          {/* Press Kit */}
          <div>
            <h3>Press Kit</h3>
            <ul>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Download Press Photos
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Download Press Release
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Download Technical Rider
                </a>
              </li>
            </ul>
          </div>

          {/* Industry Contacts */}
          {siteSettings && (
            <div>
              <h3>Industry Contacts</h3>
              <dl>
                {siteSettings.booking_email && (
                  <>
                    <dt>Booking</dt>
                    <dd>
                      <a href={`mailto:${siteSettings.booking_email}`}>
                        {siteSettings.booking_email}
                      </a>
                    </dd>
                  </>
                )}
                {siteSettings.press_email && (
                  <>
                    <dt>Press</dt>
                    <dd>
                      <a href={`mailto:${siteSettings.press_email}`}>
                        {siteSettings.press_email}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>

        {/* Band Members */}
        <div>
          <h2>Band Members</h2>
          {membersError ? (
            <div role="alert">
              <p>Unable to load band member profiles. Please try again later.</p>
            </div>
          ) : sortedMembers.length > 0 ? (
            <div>
              {sortedMembers.map(member => (
                <article key={member._id}>
                  <header>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </header>

                  {member.image && (
                    <div>
                      {/* We'll implement the image component later in the styling phase */}
                    </div>
                  )}

                  <div>
                    {/* For now, we'll just show the bio as plain text */}
                    {typeof member.bio === 'string' 
                      ? member.bio
                      : JSON.stringify(member.bio)}
                  </div>

                  {member.instruments && member.instruments.length > 0 && (
                    <div>
                      <h4>Instruments</h4>
                      <ul>
                        {member.instruments.map((instrument, index) => (
                          <li key={index}>{instrument}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {member.social_links && (
                    <div>
                      <h4>Follow {member.name.split(' ')[0]}</h4>
                      <ul>
                        {Object.entries(member.social_links).map(([platform, url]) => (
                          <li key={platform}>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              {platform}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p>No band member profiles available.</p>
          )}
        </div>

        {/* Achievements & Discography */}
        <div>
          <h2>Achievements & Discography</h2>
          <div>
            <h3>Notable Achievements</h3>
            {/* This will be populated from Sanity once we add achievements to the schema */}
            <p>Coming soon</p>
          </div>

          <div>
            <h3>Discography</h3>
            {/* This will be populated from Sanity once we add discography to the schema */}
            <p>Coming soon</p>
          </div>
        </div>
      </section>
    </div>
  )
}