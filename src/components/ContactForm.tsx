'use client'

import { type FC, useState } from 'react'
import { contactFormSchema, type ContactFormData } from 'lib/contactValidation'

interface ContactFormProps {
  className?: string
}

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  inquiryType: 'general',
}

export const ContactForm: FC<ContactFormProps> = ({ className }) => {
  const [values, setValues] = useState<ContactFormData>(initialValues)
  const [errors, setErrors] = useState<Record<keyof ContactFormData, string | null>>({
    name: null,
    email: null,
    subject: null,
    message: null,
    inquiryType: null,
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string>('')

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({ ...values, [field]: e.target.value })
  }

  const validate = () => {
    const parseResult = contactFormSchema.safeParse(values)
    if (parseResult.success) {
      setErrors({ name: null, email: null, subject: null, message: null, inquiryType: null })
      return true
    }
    const fieldErrors: Record<keyof ContactFormData, string | null> = {
      name: null,
      email: null,
      subject: null,
      message: null,
      inquiryType: null,
    }
    const zodErrors = parseResult.error.flatten().fieldErrors
    for (const key in fieldErrors) {
      const k = key as keyof ContactFormData
      if (zodErrors[k] && zodErrors[k]!.length) {
        fieldErrors[k] = zodErrors[k]![0]
      }
    }
    setErrors(fieldErrors)
    return false
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error?.message || `Request failed with status ${res.status}`)
      }
      setStatus('success')
      setValues(initialValues)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      setServerError(message)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">Name *</label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium">Email *</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="block font-medium">Inquiry Type *</label>
          <select
            id="inquiryType"
            value={values.inquiryType}
            onChange={handleChange('inquiryType')}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600"
          >
            <option value="general">General</option>
            <option value="booking">Booking</option>
            <option value="press">Press</option>
            <option value="technical">Technical</option>
          </select>
          {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType}</p>}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block font-medium">Subject *</label>
          <input
            id="subject"
            type="text"
            value={values.subject}
            onChange={handleChange('subject')}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600"
            required
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-medium">Message *</label>
          <textarea
            id="message"
            rows={6}
            value={values.message}
            onChange={handleChange('message')}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600"
            required
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {status === 'success' && (
          <p className="text-green-500">Message sent successfully. We'll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-red-500">{serverError || 'An error occurred while sending. Please try again later.'}</p>
        )}
      </div>
    </form>
  )
}
