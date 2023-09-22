import Link from 'next/link'
import React from 'react'

export default function component({ settings }) {
  if (!settings) return 'error'

  return (
    <footer className='site-footer outer'>
      <div className='inner'>
        <section className='copyright'>
          <a href='/'>{settings.title}</a> &copy; {new Date().getFullYear()}
        </section>
        <nav className='site-footer-nav'>
          <ul className='nav'>
            {settings.secondary_navigation.map((item, idx) => (
              <li key={idx} className='nav-item'>
                <Link href={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
