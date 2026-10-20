import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/menu', '/about', '/lounge', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === '/menu' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : p === '/menu' ? 0.9 : 0.6,
  }))
}
