import moment from 'moment'
import Link from 'next/link'
import { FeatureIcon, getIMGXUrl } from 'nextcasper'

export default function component({
  post,
  isLarge = false,
  isDynamic = false
}) {
  const url = `/post/${post.slug}/${post.id}` // use url instead of post.url
  const { authors, tags } = post
  const author = authors[0]
  const classNames = []

  if (isLarge) classNames.push('post-card-large')
  if (isDynamic) classNames.push('dynamic')
  if (!post.access) classNames.push(`post-access-${post.visibility}`)

  return (
    <article className={`post-card post ${classNames.join(' ')}`}>
      <Link href={url} className='post-card-image-link'>
        <img
          className='post-card-image'
          sizes='(max-width: 1000px) 400px, 800px'
          src={
            post && post.feature_image
              ? isLarge || isDynamic
                ? getIMGXUrl(post.feature_image, 900, 450)
                : getIMGXUrl(post.feature_image, 600, 300)
              : null
          }
        />
        {post.title}
      </Link>
      <div className='post-card-content'>
        <Link href={url} className='post-card-content-link'>
          <header className='post-card-header'>
            <div className='post-card-tags'>
              {tags && tags[0] ? (
                <span className='post-card-primary-tag'>{tags[0].name}</span>
              ) : null}
              {post.featured ? (
                <span className='post-card-featured'>
                  <FeatureIcon /> Featured
                </span>
              ) : null}
            </div>
            <h2 className='post-card-title'>{post.title}</h2>
          </header>
          <div className='post-card-excerpt'>{post.excerpt}</div>
        </Link>
        <footer className=''>
          <div className='post-card-meta'>
            {authors ? (
              <ul className='author-list'>
                <li className='author-list-item'>
                  <Link href={`/author/${author.slug}`} className=''>
                    {authors.map((_) => _.name).join(',')}
                  </Link>
                </li>
              </ul>
            ) : null}
            <span className='sep'>—</span>
            <time className='post-card-meta-date' dateTime={post.published_at}>
              {moment(post.published_at).format('YYYY-MM-DD')}
            </time>
            {post.reading_time && (
              <>
                <span className='sep'>—</span>
                <span className='post-card-meta-length'>
                  {post.reading_time} min read
                </span>
              </>
            )}
          </div>
          {/* <div className="post-card-meta">
            <Link href={`/author/${author.slug}`}>
              <a href={`/author/${author.slug}`} className="author-avatar">
                {author.profile_image ? (
                  <img
                    className="author-profile-image"
                    src={getIMGXUrl(author.profile_image, 100)}
                  />
                ) : (
                  <ProfileIcon />
                )}
              </a>
            </Link>
          </div> */}
        </footer>
      </div>
    </article>
  )
}
