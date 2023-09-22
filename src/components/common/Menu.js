import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function component() {
  const router = useRouter()
  const [isShowMenu, setShowMenu] = useState(false)

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
  )
}
