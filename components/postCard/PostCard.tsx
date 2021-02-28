import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.css';

export default function Layout({
  title,
  date,
  author,
  bannerImage,
  markdownContent,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.bannerContainer}>
        {bannerImage ? (
          <Image
            priority={true}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 50%"
            src={bannerImage}
          ></Image>
        ) : null}
      </div>
      <h2 className={styles.bannerTitle}>{title}</h2>
      <p>{date}</p>
      <p>{author}</p>
      <div className={styles.content}>
        <ReactMarkdown className="markdown">{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}
