import { isoDatetime } from '../utils/formatDate'

const webUrl = process.env.NEXT_PUBLIC_WEB_URL

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
    siteName: settings.siteName
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
    canonical: headProps.canonical
  }

  return {
    metadataBase: new URL(webUrl),
    title: metaProps.title,
    description: metaProps.description,
    alternates: {
      canonical: metaProps.canonical
    },
    openGraph: {
      title: metaProps.title,
      description: metaProps.description,
      url: webUrl,
      siteName: settings.title,
      images: [],
      locale: 'en_US',
      type: 'website'
    }
  }
}

export const getPostMetadata = ({ post, settings }) => {
  if (!post) {
    return getMetadata(settings)
  }

  const headProps = {
    title: settings.title ? `${post.title} | ${settings.title}` : post.title,
    description: post.custom_excerpt || post.excerpt,
    canonical: `/post/${post.slug}/${post.id}`
  }

  const openGraph = {
    title: post.title,
    description: headProps.description,
    images: [post.feature_image],
    type: 'article',
    publishedTime: isoDatetime(post.published_at),
    modifiedTime: isoDatetime(post.updated_at)
  }

  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  }
}

export const getPageMetadata = ({ page, settings }) => {
  const headProps = {
    title: settings.title ? `${page.title} | ${settings.title}` : page.title,
    description: page.custom_excerpt || page.excerpt,
    canonical: `/page/${page.slug}`
  }

  const openGraph = {
    title: page.title,
    description: headProps.description,
    images: [page.feature_image],
    type: 'article',
    publishedTime: isoDatetime(page.published_at),
    modifiedTime: isoDatetime(page.updated_at)
  }

  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  }
}

export const getTagMetadata = ({ tag, settings }) => {
  const headProps = {
    title: settings.title ? `${tag.title} | ${settings.title}` : tag.title,
    description: tag.custom_excerpt || tag.excerpt,
    canonical: `/tag/${tag.slug}`
  }

  const openGraph = {
    title: tag.title,
    description: headProps.description,
    images: [tag.feature_image],
    type: 'article',
    publishedTime: isoDatetime(tag.published_at),
    modifiedTime: isoDatetime(tag.updated_at)
  }

  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  }
}

export const getAuthorMetadata = ({ author, settings }) => {
  const headProps = {
    title: settings.title ? `${author.name} | ${settings.title}` : author.name,
    description: author.bio,
    canonical: `/author/${author.slug}`
  }

  const openGraph = {
    title: author.name,
    description: headProps.description,
    images: [author.feature_image],
    type: 'article',
    publishedTime: isoDatetime(author.published_at),
    modifiedTime: isoDatetime(author.updated_at)
  }

  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  }
}
