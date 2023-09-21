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

export async function getPosts({ limit = 'all' }) {
  const options = {
    limit: limit,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }
  const queryString = getParamSerializer(options)
  console.log('>>>>', queryString)
  return await api.posts.browse(options).catch((err) => {
    console.error(err)
  })
}

export async function getPostsByTag(slug, { limit = 'all' }) {
  const options = {
    limit: limit,
    filter: `tag:${slug}`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }
  const queryString = getParamSerializer(options)
  return await api.posts.browse(options).catch((err) => {
    console.error(err)
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
  const queryString = getParamSerializer(options)
  return await api.posts.browse(options).catch((err) => {
    console.error(err)
  })
}

export async function getSinglePostBySlug(slug) {
  const options = {
    slug,
    include: ['tags', 'authors', 'count.posts']
  }
  const queryString = getParamSerializer(options)
  return await api.posts.read(options).catch((err) => {
    if (!err.response) {
      console.error(err)
    } else if (err && err.response && err.response.status >= 500) {
      console.error(err)
    }
  })
}

export async function getSinglePostById(id) {
  const options = {
    id,
    include: ['tags', 'authors', 'count.posts']
  }
  const queryString = getParamSerializer(options)
  return await api.posts.read(options).catch((err) => {
    if (!err.response) {
      console.error(err)
    } else if (err && err.response && err.response.status >= 500) {
      console.error(err)
    }
  })
}

export async function getPages() {
  const options = {
    limit: 'all'
  }
  const queryString = getParamSerializer(options)
  return await api.pages.browse(options).catch((err) => {
    if (err && err.response && err.response.status > 500) {
      console.error(err)
    }
  })
}

export async function getSinglePage(slug) {
  const options = {
    slug,
    limit: 'all',
    order: ['featured DESC', 'published_at DESC'],
    page: 1
  }
  const queryString = getParamSerializer(options)
  return await api.pages.read(options).catch((err) => {
    if (!err.response) {
      console.error(err)
    } else if (err.response.status >= 500) {
      console.error(err)
    }
  })
}

const optionsToParams = (options) => {
  for (const [key, value] of Object.entries(options)) {
    console.log(key, value)
  }
  return ''
}

const ghostApiCall = async ({ contentType }) => {
  const ghostUrl = process.env.NEXT_PUBLIC_GHOST_CONTENT_URL
  const key = process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY
  const url = `${ghostUrl}/ghost/api/content/${contentType}/?key=${key}`
  const response = await fetch(url)
  if (!response.ok) {
    console.error('not ok')
    return null
  }

  return response.json()
}

export async function getSettings() {
  return ghostApiCall({ contentType: 'settings' })
}

export async function getTags({ limit = 'all' }) {
  return await api.tags
    .browse({
      limit: limit
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
      slug
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
      limit: limit
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
      slug
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
  const options = {
    limit: 6,
    filter: `tags:[${tagList}]`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    exclude: 'html',
    order: ['featured DESC', 'published_at DESC']
  }
  const queryString = getParamSerializer(options)
  const res = await api.posts.browse(options).catch((err) => {
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
      order: ['featured DESC', 'posts.count DESC']
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
