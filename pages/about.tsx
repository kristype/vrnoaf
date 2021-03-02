import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import styles from '../styles/about.module.css';
import Layout from '../components/layout/Layout';
import { Head } from '../components/Head';
import Markdown from '../components/markdown/Markdown';

export default function About({ data, content }) {
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

export const getStaticProps: GetStaticProps = async function () {
  var file = matter((await import('../content/about.md')).default);
  return {
    props: {
      data: file.data,
      content: file.content,
    },
  };
};
