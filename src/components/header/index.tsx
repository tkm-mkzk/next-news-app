import styles from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon}>
          <Image src="/img/headerIcon/menu.png" alt="menu icon" loading="eager" width={22} height={22} priority />
        </div>
        <h1 style={{ letterSpacing: '1px', textAlign: 'left' }}>
          <Link href="/">
            <span style={{ fontWeight: 250 }}>Simple</span>
            <span style={{ fontWeight: 100 }}>News</span>
          </Link>
        </h1>
      </header>
    </section>
  )
}

export default Header
