import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import FacebookIcon from '../facebook-icon';
import DiscordIcon from '../discord-icon';
import JetIcon from '../jet-icon';

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
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
