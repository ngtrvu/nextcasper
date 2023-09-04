'use client'

const Layout = ({ children, settings }) => {
  if (!settings) {
    return 'settings error'
  }

  return <div className="site-content">{children}</div>
}

export default Layout
