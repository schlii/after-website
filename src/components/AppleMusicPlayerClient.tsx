'use client'

import AppleMusicPlayer from '@/components/AppleMusicPlayer'
import { type FC } from 'react'

interface AppleMusicPlayerClientProps {
  showPlaylist?: boolean
}

const AppleMusicPlayerClient: FC<AppleMusicPlayerClientProps> = ({ showPlaylist }) => {
  return <AppleMusicPlayer showPlaylist={showPlaylist} />
}

export default AppleMusicPlayerClient
