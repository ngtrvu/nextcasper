import { ensureContent } from 'nextcasper/lib/ghost/content'
import { getIMGXUrl } from 'nextcasper/lib/image/optimizer'

export default function component({ page }) {
  return (
    <main id="site-main" className="site-main">
      <article className="article page">
        <header className="article-header gh-canvas">
          <h1 className="article-title">{page.title}</h1>

          {page.custom_excerpt ? (
            <p className="article-excerpt">{page.custom_excerpt}</p>
          ) : null}

          <div className="article-byline">
            <section className="article-byline-content"></section>
          </div>
          {page.feature_image ? (
            <figure className="article-image">
              <img
                srcSet={`${getIMGXUrl(page.feature_image, 300)} 300w
                ${getIMGXUrl(page.feature_image, 600)} 600w,
                ${getIMGXUrl(page.feature_image, 1000)} 1000w,
                ${getIMGXUrl(page.feature_image, 2000)} 2000w`}
                sizes="(min-width: 1400px) 1400px, 92vw"
                src={`${getIMGXUrl(page.feature_image, 1000)}`}
              />
              {page.feature_image_caption ? (
                <figcaption
                  dangerouslySetInnerHTML={{
                    __html: page.feature_image_caption,
                  }}
                ></figcaption>
              ) : null}
            </figure>
          ) : null}
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: ensureContent(page.html) }}
          className="gh-content gh-canvas"
        ></section>

        <aside className="gh-sidebar">
          <div className="gh-toc"></div>
        </aside>
      </article>
    </main>
  )
}
