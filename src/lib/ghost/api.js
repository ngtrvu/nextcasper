import GhostContentAPI from '@tryghost/content-api'

const getParamSerializer = (parameters) => {
  const queryString = Object.keys(parameters)
    .reduce((parts, k) => {
      const val = encodeURIComponent([].concat(parameters[k]).join(','))
      return parts.concat(`${k}=${val}`)
    }, [])
    .join('&')

  return queryString
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
  makeRequest: fetchCall
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
  'updated_at'
]

const getGhostUrl = ({ contentType, params, type = 'browse' }) => {
  const ghostUrl = process.env.NEXT_PUBLIC_GHOST_CONTENT_URL
  const key = process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY
  let url = `${ghostUrl}/ghost/api/content/${contentType}/`

  if (type == 'read') {
    if (params && params.id) {
      url = `${url}${params.id}/`
      delete params.id
    } else if (params && params.slug) {
      url = `${url}slug/${params.slug}/`
      delete params.slug
    }
  }

  if (key) {
    url = `${url}?key=${key}`
  }

  if (params) {
    const queryString = getParamSerializer(params)
    url = `${url}&${queryString}`
  }

  return url
}

const ghostApiCall = async ({ contentType, params, type = 'browse' }) => {
  const url = getGhostUrl({ contentType, params, type })
  console.log(url)

  const response = await fetch(url)
  if (!response.ok) {
    console.error('not ok')
    return {}
  }

  const data = await response.json()
  if (type == 'read') {
    const items = data ? data[contentType] : []
    if (items && items.length > 0) {
      return { [contentType]: items[0] }
    }

    return {}
  }

  return data
}

export async function getPosts({ limit = 'all' }) {
  const options = {
    limit: limit,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }
  return ghostApiCall({ contentType: 'posts', params: options })
}

export async function getPostsByTag(slug, { limit = 'all' }) {
  const options = {
    limit: limit,
    filter: `tag:${slug}`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }
  return ghostApiCall({
    contentType: 'posts',
    params: options
  })
}

export async function getPostsByAuthor(slug, { limit = 'all' }) {
  const options = {
    limit: limit,
    filter: `author:${slug}`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }
  return ghostApiCall({
    contentType: 'posts',
    params: options
  })
}

export async function getSinglePostBySlug(slug) {
  const options = {
    slug,
    include: ['tags', 'authors', 'count.posts']
  }
  return ghostApiCall({
    contentType: 'posts',
    params: options,
    type: 'read'
  })
}

export async function getSinglePostById(id) {
  const options = {
    id,
    include: ['tags', 'authors', 'count.posts']
  }
  return ghostApiCall({
    contentType: 'posts',
    params: options,
    type: 'read'
  })
}

export async function getPages() {
  const options = {
    limit: 'all'
  }
  return ghostApiCall({
    contentType: 'pages',
    params: options
  })
}

export async function getSinglePage(slug) {
  const options = {
    slug,
    limit: 'all',
    order: ['featured DESC', 'published_at DESC'],
    page: 1
  }
  return ghostApiCall({
    contentType: 'pages',
    params: options,
    type: 'read'
  })
}

export async function getSettings() {
  return ghostApiCall({ contentType: 'settings' })
}

export async function getTags({ limit = 'all' }) {
  return ghostApiCall({
    contentType: 'tags',
    params: {
      limit: limit
    }
  })
}

export async function getTagBySlug(slug) {
  return ghostApiCall({
    contentType: 'tags',
    params: {
      slug: slug
    },
    type: 'read'
  })
}

export async function getAuthorBySlug(slug) {
  return ghostApiCall({
    contentType: 'authors',
    params: {
      slug: slug
    },
    type: 'read'
  })
}

export async function getPostsByTags(tags = []) {
  const tagList = tags.map((tag) => tag.slug).join(',')
  const options = {
    limit: 6,
    filter: `tags:[${tagList}]`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    exclude: 'html',
    order: ['featured DESC', 'published_at DESC']
  }
  return ghostApiCall({
    contentType: 'authors',
    params: options
  })
}

export async function getSection() {
  const options = {
    filter: 'visibility:public',
    limit: 7,
    order: ['featured DESC', 'posts.count DESC']
  }
  const { tags } = await ghostApiCall({
    contentType: 'tags',
    params: options
  })

  if (!tags) return null

  return Promise.all(
    tags.map(async (tag) => {
      const { posts } = await getPostsByTag(tag.slug, { limit: 3 })
      return Object.assign(tag, { posts: posts })
    })
  )
}
