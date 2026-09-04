import { siteConfig } from '@/lib/seo/config'

const JsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',

    name: siteConfig.fullName,
    url: siteConfig.url,

    jobTitle: 'Front-End Developer',

    sameAs: [siteConfig.github, siteConfig.linkedin],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export default JsonLd
