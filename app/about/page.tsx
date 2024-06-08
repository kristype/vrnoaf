import matter from "gray-matter";
import Image from "next/image";
import styles from "../styles/about.module.css";
import Layout from "../components/layout/layout";
import { Head } from "../components/Head";
import Markdown from "../components/markdown/markdown";
import { promises as fs } from "fs";

export default async function About() {
  const file = await fs.readFile(
    process.cwd() + "/app/content/about.md",
    "utf8"
  );
  const result = matter(file);
  const data = result.data;
  const content = result.content;

  return (
    <Layout>
      <Head title={data.bannerTitle}></Head>
      <div className={styles.pageLayout}>
        <div className={styles.bannerContainer}>
          {data.banner ? (
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              objectPosition={`50% ${data.bannerCenter}%`}
              src={data.banner}
              alt="banner image"
            ></Image>
          ) : null}
        </div>
        <section className={styles.titleSection}>
          <h1 className={styles.title}>{data.header}</h1>
        </section>
        <div className={styles.content}>
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </Layout>
  );
}
