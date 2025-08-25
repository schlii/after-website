'use client'

import { type FC, useState } from 'react'
import { type PlainProductVariant } from '../../types/PlainProduct'
import css from '@/components/ContactForm.module.css'

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
      {variants.map((v) => (
        <option key={v.id} value={v.id} disabled={!v.available}>
          {v.title}
        </option>
      ))}
    </select>
  )
}
