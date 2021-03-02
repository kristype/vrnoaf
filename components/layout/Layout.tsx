import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import FacebookIcon from '../FacebookIcon';
import DiscordIcon from '../DiscordIcon';
import JetIcon from '../JetIcon';

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
                  <a className={styles.link}>
                    <JetIcon></JetIcon>
                    <span>Om oss</span>
                  </a>
                </Link>
              </li>
              <li>
                <a href="https://www.facebook.com/groups/vRNoAF/">
                  <FacebookIcon></FacebookIcon>Facebook
                </a>
              </li>
              <li>
                <a href="https://discord.gg/xhhR6NWvhC">
                  <DiscordIcon></DiscordIcon>Discord
                </a>
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
