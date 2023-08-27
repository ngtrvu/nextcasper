import moment from 'moment'
import Link from 'next/link'
import FeatureIcon from 'nextcasper/components/svg/FeatureIcon'
import ProfileIcon from 'nextcasper/components/svg/ProfileIcon'
import { ensureContent } from 'nextcasper/lib/ghost/content'
import { getIMGXUrl } from 'nextcasper/lib/image/optimizer'

export default function component({ post }) {
  const { authors, tags, primary_tag } = post

  return (
    <main id="site-main" className="site-main">
      <article className="article post">
        <header className="article-header gh-canvas">
          <div className="article-tag post-card-tags">
            {primary_tag ? (
              <span className="post-card-primary-tag">
                <Link href={`/tag/${primary_tag.slug}`}>
                  {primary_tag.name}
                </Link>
              </span>
            ) : null}

            {post.featured ? (
              <span className="post-card-featured">
                <FeatureIcon /> Featured
              </span>
            ) : null}
          </div>

          <h1 className="article-title">{post.title}</h1>

          {post.custom_excerpt ? (
            <p className="article-excerpt">{post.custom_excerpt}</p>
          ) : null}

          <div className="article-byline">
            <section className="article-byline-content">
              <ul className="author-list">
                {authors.map((author) => (
                  <li key={author.id} className="author-list-item">
                    {author.profile_image ? (
                      <Link
                        href={`/author/${author.slug}`}
                        className="author-avatar"
                      >
                        <img
                          className="author-profile-image"
                          src={author.profile_image}
                          alt={author.name}
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/author/${author.slug}`}
                        className="author-avatar"
                      >
                        <ProfileIcon /> {author.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="article-byline-meta">
                <h4 className="author-name">
                  <Link href={`/author/${authors[0].slug}`}>
                    {authors.map((_) => _.name).join(',')}
                  </Link>
                </h4>
                <div className="byline-meta-content">
                  <time className="byline-meta-date">
                    {moment(post.date).format('YYYY-MM-DD')}
                  </time>
                  <span className="byline-reading-time">
                    <span className="bull">&bull;</span> {post.reading_time} min
                    read
                  </span>
                </div>
              </div>
            </section>
          </div>

          {post.feature_image ? (
            <figure className="article-image">
              <img
                srcSet={`${getIMGXUrl(post.feature_image, 300)} 300w
                            ${getIMGXUrl(post.feature_image, 600)} 600w,
                            ${getIMGXUrl(post.feature_image, 1000)} 1000w,
                            ${getIMGXUrl(post.feature_image, 2000)} 2000w`}
                sizes="(min-width: 1400px) 1400px, 92vw"
                src={`${getIMGXUrl(post.feature_image, 1000)}`}
                ix-sizes="auto"
              />
              {post.feature_image_caption ? (
                <figcaption
                  dangerouslySetInnerHTML={{
                    __html: post.feature_image_caption,
                  }}
                ></figcaption>
              ) : null}
            </figure>
          ) : null}
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: ensureContent(post.html) }}
          className="gh-content gh-canvas"
        ></section>

        <aside className="gh-sidebar">
          <div className="gh-toc"></div>
        </aside>
      </article>
    </main>
  )
}
