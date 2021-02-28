import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.siteHeader}>
        <div className={styles.navContainer}>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <a className={styles.logoContainer}>
                <Image
                  src="/roundel_notext_camo.svg"
                  layout="fixed"
                  height="45"
                  width="45"
                ></Image>
                <p className={styles.logoText}>VRNoAF</p>
              </a>
            </Link>
          </div>
          <nav className={styles.siteNav}>
            <ul>
              <li>
                <Link href="/about">
                  <a>Om oss</a>
                </Link>
              </li>
              <li>
                <a href="https://www.facebook.com/groups/vRNoAF/">Facebook</a>
              </li>
              <li>
                <a href="https://discord.gg/xhhR6NWvhC">Discord</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={styles.shellContent}>{children}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
