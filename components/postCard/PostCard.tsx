import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from './postCard.module.css';

export default function PostCard({ data, content }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.bannerContainer}>
        {data.banner ? (
          <Image
            priority={true}
            layout="fill"
            objectFit="cover"
            objectPosition={`50% ${data.bannerCenter}%`}
            src={data.banner}
          ></Image>
        ) : null}
      </div>

      <section className={styles.titleSection}>
        <h2 className={styles.title}>{data.title}</h2>
        <dl className={styles.details}>
          <div>
            <dt className="sr-only">Bruker:</dt>
            <dd>{data.author}</dd>
          </div>
          <div>
            <dt className="sr-only">Dato:</dt>
            <dd>{new Date(data.date).toLocaleDateString()}</dd>
          </div>
        </dl>
      </section>

      <div className={styles.content}>
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      </div>
    </div>
  );
}
