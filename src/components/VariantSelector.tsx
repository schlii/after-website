'use client'

import { type FC, useState } from 'react'
import { type PlainProductVariant } from '../../types/PlainProduct'
import css from '@/components/ContactForm.module.css'

interface Props {
  variants: PlainProductVariant[]
  onSelect: (variantId: string) => void
}

export const VariantSelector: FC<Props> = ({ variants, onSelect }) => {
  // Filter to only available variants
  const availableVariants = variants.filter(v => v.available)
  const [selected, setSelected] = useState<string>(availableVariants[0]?.id ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    onSelect(e.target.value)
  }

  // Don't show selector if only one or no available variants
  if (availableVariants.length <= 1) return null

  return (
    <select
      value={selected}
      onChange={handleChange}
      className={css.inputCapsule}
      style={{
        margin: '0  auto 0.5rem',
        width: '75%',
        maxWidth: 220,
        padding: '0.4rem 0.5rem',
        display: 'block'
      }}
    >
      {availableVariants.map((v) => (
        <option key={v.id} value={v.id}>
          {v.title}
        </option>
      ))}
    </select>
  )
}
