import Image from "next/image";
import Markdown from "../markdown/markdown";
import styles from "./post-content.module.css";
import { Today } from "@mui/icons-material";

export default function PostContent({ data, content, showDetails = true }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.bannerContainer}>
        {data.banner ? (
          <Image
            priority={true}
            objectPosition={`50% ${data.bannerCenter}%`}
            src={data.banner}
            alt="banner image"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }}></Image>
        ) : null}
      </div>

      <section className={styles.titleSection}>
        <h2 className={styles.title}>{data.title}</h2>
        {showDetails && (
          <dl className={styles.details}>
            <div>
              <dt className="sr-only">Dato:</dt>
              <dd className={styles.dateValue}>
                <Today></Today>
                <span>{new Date(data.date).toLocaleDateString()}</span>
              </dd>
            </div>
          </dl>
        )}
      </section>

      <div className={styles.content}>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
