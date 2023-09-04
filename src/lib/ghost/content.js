export const ensureContent = (content) => {
  if (!content) return null

  let mycontent = content

  // replace all gcs url to imgix
  mycontent = fixImgUrl(mycontent)

  const regex =
    /"(https:\/\/localinsider.storage.googleapis.com\/){1}([a-zA-Z0-9-_\/.]+)"/g
  mycontent = mycontent.replace(regex, 'https://localinsider.imgix.net/$2')

  return mycontent
}

function fixImgUrl(html) {
  const regex =
    /src="(https:\/\/localinsider.storage.googleapis.com\/){1}([a-zA-Z0-9-_\/.]+)"/g
  return html.replace(
    regex,
    "src='https://localinsider.imgix.net/$2?width=800'"
  )
}
