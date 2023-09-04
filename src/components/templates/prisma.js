export default function component({ page }) {
  return (
    <div className="max-w-full overflow-x-hidden relative min-h-screen my-0 mx-auto bg-white">
      <main role="main">
        <header className="py-[10vmin] px-[4vmin]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {page.title}
            </h1>
            {page.subTitle ? (
              <p className="text-2xl mt-2 text-slate-500">{page.subTitle}</p>
            ) : null}
          </div>
        </header>

        <section className="my-0 mx-auto p-[6vmin] sm:px-[6vmin]">
          {page.excerpt ? (
            <div className="my-0 mx-auto max-w-8xl w-full">
              <div className="max-w-prose mx-auto text-lg">
                <div className="pb-5">
                  {page.custom_excerpt || page.excerpt}
                </div>
              </div>
            </div>
          ) : null}

          <div className="my-0 mx-auto max-w-8xl w-full">
            <div className="max-w-prose mx-auto text-lg">
              <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
