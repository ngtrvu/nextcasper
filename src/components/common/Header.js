import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// import SearchIcon from 'components/svg/SearchIcon'

export default function component({ settings }) {
  const router = useRouter()
  const [isShowMenu, setShowMenu] = useState(false)
  const { facebook, twitter } = settings
  const twitterUrl = `https://twitter.com/${twitter}`
  const facebookUrl = `https://www.facebook.com/${facebook}`

  useEffect(() => {
    if (isShowMenu) {
      document.querySelector('#next-body').classList.add('gh-head-open')
    } else {
      document.querySelector('#next-body').classList.remove('gh-head-open')
    }
  }, [isShowMenu])

  useEffect(() => {
    setShowMenu(false)
  }, [router.asPath])

  return (
    <header id='gh-head' className='gh-head outer'>
      <nav className='gh-head-inner inner'>
        <div className='gh-head-brand'>
          <Link href='/' className='gh-head-logo no-image'>
            {settings.title}
          </Link>
          <div className='gh-head-brand-wrapper'>
            {/* <SearchIcon /> */}
            <a
              className='gh-burger'
              role='button'
              onClick={() => {
                setShowMenu(!isShowMenu)
              }}
            >
              <div className='gh-burger-box'>
                <div className='gh-burger-inner'></div>
              </div>
            </a>
          </div>
        </div>
        <div className='gh-head-menu'>
          <ul className='nav'>
            {settings.navigation.map((item, idx) => (
              <li key={idx} className='nav-item'>
                <Link href={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='gh-head-actions'>
          {/* <SearchIcon /> */}
          <div className='gh-social'>
            {facebook ? (
              <a
                className='gh-social-link gh-social-facebook'
                href={facebookUrl}
                title='Facebook'
                target='_blank'
                rel='noopener'
              >
                <svg
                  className='icon'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                >
                  <path d='M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z'></path>
                </svg>
              </a>
            ) : null}
            {twitter ? (
              <a
                className='gh-social-link gh-social-twitter'
                href={twitterUrl}
                title='Twitter'
                target='_blank'
                rel='noopener'
              >
                <svg
                  className='icon'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                >
                  <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z'></path>
                </svg>
              </a>
            ) : null}
          </div>
          {/* <a
            className="gh-head-button gh-portal-close"
            href="#/portal/signup"
            data-portal="signup"
          >
            Subscribe
          </a> */}
        </div>
      </nav>
    </header>
  )
}
