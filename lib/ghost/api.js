import GhostContentAPI from './content-api'

const getParamSerializer = (parameters) => {
  return Object.keys(parameters)
    .reduce((parts, k) => {
      const val = encodeURIComponent([].concat(parameters[k]).join(','))
      return parts.concat(`${k}=${val}`)
    }, [])
    .join('&')
}

const fetchCall = async ({ url, method = 'GET', params, headers }) => {
  const queryString = getParamSerializer(params)
  const apiUrl = url + `?${queryString}`
  const res = await fetch(apiUrl, method)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_CONTENT_URL,
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
  version: 'v5.0',
  makeRequest: fetchCall,
})

const listPostFields = [
  'id',
  'title',
  'slug',
  'description',
  'visibility',
  'feature_image',
  'primary_author',
  'access',
  'featured',
  'reading_time',
  'excerpt',
  'published_at',
  'updated_at',
]

export async function getPosts({ limit = 'all' }) {
  return await api.posts
    .browse({
      limit: limit,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC'],
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostsByTag(slug, { limit = 'all' }) {
  return await api.posts
    .browse({
      limit: limit,
      filter: `tag:${slug}`,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC'],
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostsByAuthor(slug, { limit = 'all' }) {
  return await api.posts
    .browse({
      limit: limit,
      filter: `author:${slug}`,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC'],
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSinglePostBySlug(slug) {
  return await api.posts
    .read({
      slug,
      include: ['tags', 'authors', 'count.posts'],
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getSinglePostById(id) {
  return await api.posts
    .read({
      id,
      include: ['tags', 'authors', 'count.posts'],
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getPages() {
  return await api.pages
    .browse({
      limit: 'all',
    })
    .catch((err) => {
      if (err && err.response && err.response.status > 500) {
        console.error(err)
      }
    })
}

export async function getSinglePage(slug) {
  return await api.pages
    .read({
      slug,
      limit: 'all',
      order: ['featured DESC', 'published_at DESC'],
      page: 1,
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err.response.status >= 500) {
        console.error(err)
      }
    })
}

export function getSettings() {
  return api.settings.browse().catch((err) => {
    if (!err.response) {
      console.error(err)
    } else if (err && err.response && err.response.status >= 500) {
      console.error(err)
    }
  })
}

export async function getTags({ limit = 'all' }) {
  return await api.tags
    .browse({
      limit: limit,
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getTagBySlug(slug) {
  return await api.tags
    .read({
      slug,
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getAuthors({ limit = 'all' }) {
  return await api.authors
    .browse({
      limit: limit,
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getAuthorBySlug(slug) {
  return await api.authors
    .read({
      slug,
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })
}

export async function getPostsByTags(tags = []) {
  const tagList = tags.map((tag) => tag.slug).join(',')
  const res = await api.posts
    .browse({
      limit: 6,
      filter: `tags:[${tagList}]`,
      fields: listPostFields,
      include: ['tags', 'authors'],
      exclude: 'html',
      order: ['featured DESC', 'published_at DESC'],
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })

  return res
}

export async function getSection() {
  const tags = await api.tags
    .browse({
      filter: 'visibility:public',
      limit: 7,
      order: ['featured DESC', 'posts.count DESC'],
    })
    .catch((err) => {
      if (!err.response) {
        console.error(err)
      } else if (err && err.response && err.response.status >= 500) {
        console.error(err)
      }
    })

  if (!tags) return null

  return await Promise.all(
    tags.map(async (tag) => {
      const posts = await getPostsByTag(tag.slug, { limit: 3 })
      return Object.assign(tag, { posts: posts })
    })
  )
}
