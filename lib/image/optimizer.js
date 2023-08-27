export const defaultImageUrl =
  'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmluYW5jZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

export const buildCdnUrl = (url, w = 474, h = 256) => {
  if (url) {
    return (
      'https://i0.wp.com/' +
      url.replace('https://', '') +
      `?w=${w}&h=${h}&ssl=1`
    )
  }

  return defaultImageUrl
}

export const getIMGXUrl = (url, width, height, autoFormat = true) => {
  if (!url) return null

  if (!width & !height) {
    width = 474
    height = 256
  }

  if (url.startsWith('https://images.unsplash.com/')) {
    const regex = /\&w=[\d]+/g
    return url.replace(regex, `&w=${width}`)
  }

  url = url.replace(
    'https://localinsider.storage.googleapis.com/',
    'https://localinsider.imgix.net/'
  )

  let arr = []
  if (height) arr.push(`height=${height}`)
  if (width) arr.push(`width=${width}`)
  if (autoFormat) arr.push(`auto=format&q=80`)
  const params = arr.join('&')

  if (url.includes('?')) {
    return `${url}&${params}`
  }

  return `${url}?${params}`
}
