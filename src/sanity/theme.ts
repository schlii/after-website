import { buildLegacyTheme } from 'sanity'

const props = {
  '--band-white': '#ffffff',
  '--band-black': '#1a1a1a',
  '--band-primary': '#ff0066', // Hot pink for 2000s aesthetic
  '--band-secondary': '#00ffff', // Cyan for 2000s aesthetic
  '--band-accent': '#ff9900', // Orange accent
  '--band-error': '#ff0000',
}

export const bandTheme = buildLegacyTheme({
  // Base theme colors
  '--black': props['--band-black'],
  '--white': props['--band-white'],

  '--gray': '#666666',
  '--gray-base': '#666666',

  '--component-bg': props['--band-black'],
  '--component-text-color': props['--band-white'],

  // Brand colors
  '--brand-primary': props['--band-primary'],

  // Default button
  '--default-button-color': '#666666',
  '--default-button-primary-color': props['--band-primary'],
  '--default-button-success-color': props['--band-secondary'],
  '--default-button-warning-color': props['--band-accent'],
  '--default-button-danger-color': props['--band-error'],

  // State
  '--state-info-color': props['--band-primary'],
  '--state-success-color': props['--band-secondary'],
  '--state-warning-color': props['--band-accent'],
  '--state-danger-color': props['--band-error'],

  // Navigation
  '--main-navigation-color': props['--band-black'],
  '--main-navigation-color--inverted': props['--band-white'],

  // Focus
  '--focus-color': props['--band-primary'],
})