'use client'

import { type FC, useState } from 'react'
import { type PlainProductVariant } from '../../types/PlainProduct'

interface Props {
  variants: PlainProductVariant[]
  onSelect: (variantId: string) => void
}

export const VariantSelector: FC<Props> = ({ variants, onSelect }) => {
  const [selected, setSelected] = useState<string>(variants[0]?.id ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    onSelect(e.target.value)
  }

  if (variants.length <= 1) return null // no variants to choose

  return (
    <select value={selected} onChange={handleChange} style={{ marginBottom: '0.5rem', width: '100%' }}>
      {variants.map((v) => (
        <option key={v.id} value={v.id} disabled={!v.available}>
          {v.title} – ${v.price}
        </option>
      ))}
    </select>
  )
}
