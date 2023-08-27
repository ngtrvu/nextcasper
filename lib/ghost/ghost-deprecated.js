import { parse as urlParse } from 'url'
import GhostContentAPI from '@tryghost/content-api'
import { normalizePost } from '@lib/ghost-normalize'
import { collections as config } from '@routesConfig'
import { Collections } from '@lib/collections'
import { ghostAPIUrl, ghostAPIKey, processEnv } from '@lib/processEnv'
import { imageDimensions, normalizedImageUrl } from './images'
import { contactPage } from '@appConfig'

const api = new GhostContentAPI({
  url: ghostAPIUrl,
  key: ghostAPIKey,
  version: 'v3',
})

const postAndPageFetchOptions = {
  limit: 'all',
  include: ['tags', 'authors', 'count.posts'],
  order: ['featured DESC', 'published_at DESC'],
  page: 1,
}

const tagAndAuthorFetchOptions = {
  limit: 'all',
  include: 'count.posts',
}

const postAndPageSlugOptions = {
  limit: 'all',
  fields: 'slug',
}

const excludePostOrPageBySlug = () => {
  if (!contactPage) return ''
  return 'slug:-contact'
}

// helpers
export const createNextImage = async (url) => {
  if (!url) return undefined
  const normalizedUrl = await normalizedImageUrl(url)
  const dimensions = await imageDimensions(normalizedUrl)
  return (dimensions && { url: normalizedUrl, dimensions }) || undefined
}

async function createNextFeatureImages(nodes) {
  const { meta } = nodes
  const images = await Promise.all(
    nodes.map((node) => createNextImage(node.feature_image))
  )
  const results = nodes.map((node, i) =>
    Object.assign(
      Object.assign({}, node),
      images[i] && { featureImage: images[i] }
    )
  )
  return Object.assign(results, { meta })
}

async function createNextProfileImages(nodes) {
  const { meta } = nodes
  const images = await Promise.all(
    nodes.map((node) => createNextImage(node.profile_image))
  )
  const results = nodes.map((node, i) =>
    Object.assign(
      Object.assign({}, node),
      images[i] && { profileImage: images[i] }
    )
  )
  return Object.assign(results, { meta })
}

export async function createNextProfileImagesFromAuthors(nodes) {
  if (!nodes) return undefined
  const images = await Promise.all(
    nodes.map((node) => createNextImage(node.profile_image))
  )
  return nodes.map((node, i) =>
    Object.assign(
      Object.assign({}, node),
      images[i] && { profileImage: images[i] }
    )
  )
}

async function createNextProfileImagesFromPosts(nodes) {
  const { meta } = nodes
  const authors = await Promise.all(
    nodes.map((node) => createNextProfileImagesFromAuthors(node.authors))
  )
  const results = nodes.map((node, i) =>
    Object.assign(
      Object.assign({}, node),
      authors[i] && { authors: authors[i] }
    )
  )
  return Object.assign(results, meta && { meta })
}

export async function getAllSettings() {
  var _a
  //const cached = getCache<SettingsResponse>('settings')
  //if (cached) return cached
  const settings = await api.settings.browse()
  settings.url =
    (_a = settings === null || settings === void 0 ? void 0 : settings.url) ===
      null || _a === void 0
      ? void 0
      : _a.replace(/\/$/, ``)
  const iconImage = await createNextImage(settings.icon)
  const logoImage = await createNextImage(settings.logo)
  const coverImage = await createNextImage(settings.cover_image)
  const result = Object.assign(
    Object.assign(
      Object.assign(
        Object.assign({ processEnv }, settings),
        iconImage && { iconImage }
      ),
      logoImage && { logoImage }
    ),
    coverImage && { coverImage }
  )
  //setCache('settings', result)
  return result
}

export async function getAllTags() {
  const tags = await api.tags.browse(tagAndAuthorFetchOptions)
  return await createNextFeatureImages(tags)
}

export async function getAllAuthors() {
  const authors = await api.authors.browse(tagAndAuthorFetchOptions)
  return await createNextProfileImages(authors)
}

export async function getAllPosts(props) {
  const posts = await api.posts.browse(
    Object.assign(
      Object.assign(Object.assign({}, postAndPageFetchOptions), {
        filter: excludePostOrPageBySlug(),
      }),
      props && Object.assign({}, props)
    )
  )
  const results = await createNextProfileImagesFromPosts(posts)
  return await createNextFeatureImages(results)
}

export async function getAllPostSlugs() {
  const posts = await api.posts.browse(postAndPageSlugOptions)
  return posts.map((p) => p.slug)
}

export async function getAllPages(props) {
  const pages = await api.pages.browse(
    Object.assign(
      Object.assign(Object.assign({}, postAndPageFetchOptions), {
        filter: excludePostOrPageBySlug(),
      }),
      props && Object.assign({}, props)
    )
  )
  return await createNextFeatureImages(pages)
}

// specific data by slug
export async function getTagBySlug(slug) {
  return await api.tags.read(
    Object.assign(Object.assign({}, tagAndAuthorFetchOptions), { slug })
  )
}

export async function getAuthorBySlug(slug) {
  const author = await api.authors.read(
    Object.assign(Object.assign({}, tagAndAuthorFetchOptions), { slug })
  )
  const profileImage = await createNextImage(author.profile_image)
  const result = Object.assign(
    Object.assign({}, author),
    profileImage && { profileImage }
  )
  return result
}

export async function getPostBySlug(slug) {
  var _a
  let result
  try {
    const post = await api.posts.read(
      Object.assign(Object.assign({}, postAndPageFetchOptions), { slug })
    )
    // older Ghost versions do not throw error on 404
    if (!post) return null

    const { url } = await getAllSettings()

    result = await normalizePost(post, (url && urlParse(url)) || undefined)
  } catch (e) {
    const error = e
    if (
      ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ===
      404
    )
      return null
    throw e
  }
  return result
}

export async function getPageBySlug(slug) {
  var _a
  let result
  try {
    const page = await api.pages.read(
      Object.assign(Object.assign({}, postAndPageFetchOptions), { slug })
    )
    // older Ghost versions do not throw error on 404
    if (!page) return null
    const { url } = await getAllSettings()
    result = await normalizePost(page, (url && urlParse(url)) || undefined)
  } catch (e) {
    const error = e
    if (
      ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ===
      404
    )
      return null
    throw e
  }
  return result
}

// specific data by author/tag slug
export async function getPostsByAuthor(slug) {
  const posts = await api.posts.browse(
    Object.assign(Object.assign({}, postAndPageFetchOptions), {
      filter: `authors.slug:${slug}`,
    })
  )
  return await createNextFeatureImages(posts)
}

export async function getPostsByTag(slug, limit, excludeId) {
  const exclude = (excludeId && `+id:-${excludeId}`) || ``
  const posts = await api.posts.browse(
    Object.assign(
      Object.assign(
        Object.assign({}, postAndPageFetchOptions),
        limit && { limit: `${limit}` }
      ),
      { filter: `tags.slug:${slug}${exclude}` }
    )
  )
  return await createNextFeatureImages(posts)
}

// Collections
export const collections = new Collections(config)
