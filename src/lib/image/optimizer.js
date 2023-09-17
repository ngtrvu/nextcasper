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
