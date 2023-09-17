import Image from 'next/image'
import { ExampleComponent } from 'nextcasper'
import 'nextcasper/dist/index.css'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          By{' '}
          <Image
            src='/vercel.svg'
            alt='Vercel Logo'
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>

      <div className={styles.center}>
        <ExampleComponent text='NextCasper' />
      </div>
    </main>
  )
}
