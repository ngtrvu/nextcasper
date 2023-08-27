const settingFields = [
  'title',
  'description',
  'logo',
  'icon',
  'cover_image',
  'facebook',
  'twitter',
  'lang',
  'locale',
  'timezone',
  'navigation',
  'secondary_navigation',
  'meta_title',
  'meta_description',
  'og_image',
  'og_title',
  'og_description',
  'twitter_image',
  'twitter_title',
  'twitter_description',
  'url',
]

export const minimizeData = (obj) => {
  const results = {}
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    if (settingFields.indexOf(key) > 0) {
      results[key] = obj[key]
    }
  })
  return results
}

export default minimizeData
