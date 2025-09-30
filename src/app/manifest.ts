import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Français Pro - Learn French from Zero to Hero',
    short_name: 'Français Pro',
    description: 'Master French language with interactive lessons, AI-powered tutoring, and real-time progress tracking. Perfect for Canadian immigration and Express Entry.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    categories: ['education', 'lifestyle', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    icons: [],
    screenshots: [],
    related_applications: [],
    prefer_related_applications: false,
  }
}
