import { webUrl } from 'nextcasper/config'
import { getIMGXUrl } from 'nextcasper/lib/image/optimizer'

export const getMetadata = (settings, headProps = {}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.url
  const rssUrl = `${siteUrl}/rss`
  const defaultProps = {
    title:
      settings.meta_title ||
      settings.title ||
      'Local Insider | Travel like a local',
    description:
      settings.meta_description ||
      settings.description ||
      'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    url: settings.url,
    siteName: settings.siteName,
  }

  const metaProps = {
    ...defaultProps,
    ...headProps,
    ogTitle:
      headProps.og_title ||
      headProps.title ||
      settings.og_title ||
      defaultProps.title,
    ogDescription: headProps.og_description || headProps.description,
    ogImage:
      headProps.og_image ||
      headProps.photo ||
      settings.og_image ||
      defaultProps.photo,
    twitterTitle: headProps.twitterTitle || headProps.title || settings.title,
    twitterImage:
      headProps.twitterImage ||
      headProps.photo ||
      settings.og_image ||
      'https://localinsider.storage.googleapis.com/2022/09/LOGO-4.png',
    twitterDescription:
      headProps.twitterDescription ||
      headProps.description ||
      'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    ogUrl: headProps.og_url || headProps.canonical || defaultProps.url,
    canonical: headProps.canonical,
  }

  return {
    metadataBase: new URL(webUrl),
    title: metaProps.title,
    description: metaProps.description,
    alternates: {
      canonical: metaProps.canonical,
    },
    openGraph: {
      title: metaProps.title,
      description: metaProps.description,
      url: webUrl,
      siteName: settings.title,
      images: [],
      locale: 'en_US',
      type: 'website',
    },
  }
}
export const renderHead = (settings) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.url
  const rssUrl = `${siteUrl}/rss`

  const headProps = {}
  const defaultProps = {
    title: settings.meta_title,
    description: settings.meta_description,
    url: settings.url,
    siteName: settings.siteName,
  }

  const metaProps = {
    ...defaultProps,
    ...headProps,
    ogTitle:
      headProps.og_title ||
      headProps.title ||
      settings.og_title ||
      defaultProps.title,
    ogDescription: headProps.og_description || headProps.description,
    ogImage:
      headProps.og_image ||
      headProps.photo ||
      settings.og_image ||
      defaultProps.photo,
    twitterTitle: headProps.twitterTitle || headProps.title || settings.title,
    twitterImage:
      headProps.twitterImage ||
      headProps.photo ||
      settings.og_image ||
      'https://localinsider.storage.googleapis.com/2022/09/LOGO-4.png',
    twitterDescription:
      headProps.twitterDescription ||
      headProps.description ||
      'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    ogUrl: headProps.og_url || headProps.canonical || defaultProps.url,
    canonical: headProps.canonical,
  }

  return (
    <head>
      <meta name="theme-color" content="#000000" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metaProps.description} />
      <meta name="keywords" content={metaProps.keywords} />
      <link rel="icon" href={getIMGXUrl(settings.icon, 50)} />
      <meta name="og:site_name" content={metaProps.siteName} />
      <meta name="og:title" content={metaProps.ogTitle} />
      <meta name="og:description" content={metaProps.ogDescription} />
      <meta name="og:image" content={getIMGXUrl(metaProps.ogImage, 800)} />
      <meta name="og:url" content={metaProps.ogUrl} />

      {metaProps.mediaType && (
        <meta name="og:type" content={metaProps.mediaType} />
      )}

      {metaProps.publishedTime && (
        <meta name="article:published_time" content={metaProps.publishedTime} />
      )}

      {metaProps.modifiedTime && (
        <meta name="article:modified_time" content={metaProps.modifiedTime} />
      )}

      {metaProps.canonical && (
        <link rel="canonical" href={metaProps.canonical} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaProps.twitterTitle} />
      <meta name="twitter:description" content={metaProps.twitterDescription} />
      <meta name="twitter:url" content={siteUrl} />
      <meta
        name="twitter:image"
        content={getIMGXUrl(settings.twitterImage, 500)}
      />
      <meta name="twitter:site" content={settings.twitter} />
      <meta property="og:image:width" content="2000" />
      <meta property="og:image:height" content="1333" />

      <link
        rel="alternate"
        type="application/rss+xml"
        title={settings.title}
        href={rssUrl}
      />

      <script defer src="/assets/cards.min.js?v=562f96932c" />
    </head>
  )
}
