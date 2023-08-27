export default function component({ page }) {
  return (
    <div className="">
      <main className="gh-main">
        <article className="gh-article post">
          <div className="gh-article-header gh-canvas">
            <h1 className="gh-article-title">{page.title}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: page.html }}
            className="gh-content gh-canvas"
          ></div>
        </article>
      </main>
    </div>
  )
}
