'use client'

const Layout = ({ isHome = false, children, settings, hasCover = true }) => {
  if (!settings) {
    return 'settings error'
  }

  let classNames = ''
  if (isHome) classNames = `${classNames} home-template`
  if (hasCover) classNames = `${classNames} has-sans-body has-cover`

  return <div className="site-content">{children}</div>
}

export default Layout
