import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import FacebookIcon from '../facebook-icon';
import DiscordIcon from '../discord-icon';
import JetIcon from '../jet-icon';
import { Menu } from '@material-ui/icons';
import { RefObject, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    setCurrentLocation((window as Window).location.href);
  });
  const navRef: RefObject<HTMLElement> = useRef(null);
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <a className={styles.logoContainer}>
              <Image
                src="/roundel_notext_camo.svg"
                layout="intrinsic"
                height="45"
                width="45"
                alt="VRNoAF logo"
              ></Image>
              <p className={styles.logoText}>VRNoAF</p>
            </a>
          </Link>
          <nav
            className={styles.siteNav}
            ref={navRef}
            onBlur={(e) => {
              if (!navRef.current.contains(e.target)) {
                setExpanded(false);
              }
            }}
          >
            <button
              className={styles.menuButton}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <Menu></Menu>
            </button>
            <ul
              className={classNames(styles.navMenu, {
                [styles.navMenuHidden]: !expanded,
              })}
            >
              <li>
                <Link href="/about">
                  <a
                    className={classNames(styles.link, {
                      [styles.linkActive]: currentLocation?.endsWith('/about'),
                    })}
                  >
                    <JetIcon></JetIcon>
                    <span>Om oss</span>
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className={styles.link}
                  href="https://www.facebook.com/groups/vRNoAF/"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
              <li>
                <a className={styles.link} href="https://discord.gg/xhhR6NWvhC">
                  <DiscordIcon />
                  Discord
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
