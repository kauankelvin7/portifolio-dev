import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    { url: `${baseUrl}/projects/omni`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/projects/leve`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
