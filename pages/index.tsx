import { GetStaticProps } from 'next';
import Image from 'next/image';
import { glob } from 'glob';
import styles from '../styles/home.module.css';
import Layout from '../components/layout/layout';
import { Head } from '../components/head';
import matter from 'gray-matter';
import PostContent from '../components/post-content/post-content';

export default function Home({ data, posts }) {
  return (
    <Layout>
      <Head title="VRNoAF"></Head>

      <div className={styles.layout}>
        {data.logo ? (
          <div className={styles.logoContainer}>
            <Image
              priority={true}
              layout="fill"
              objectFit="contain"
              objectPosition="top"
              src={data.logo}
            ></Image>
          </div>
        ) : null}
        {data.banner ? (
          <div className={styles.bannerContainer}>
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              src={data.banner}
            ></Image>
          </div>
        ) : null}
        <h1 className={styles.bannerTitle}>{data.header}</h1>
        <div className={styles.postsContainer}>
          {posts.map((p, i) => (
            <PostContent
              key={i}
              data={p.data}
              content={p.content}
            ></PostContent>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const posts = glob.sync('content/posts/**/*.md');

  //remove path and extension to leave filename only
  const postSlugs = posts.map((file) =>
    file.split('/')[2].replace(/ /g, '-').slice(0, -3).trim()
  );

  const postsContent = postSlugs.map(
    async (slug) => await import(`../content/posts/${slug}.md`)
  );

  const parsed = (await Promise.all(postsContent))
    .map((imported) => matter(imported.default))
    .sort((a, b) => {
      return b.data.date - a.data.date;
    })
    .map((p) => ({
      data: { ...p.data, date: p.data.date.toISOString() },
      content: p.content,
    }));

  return {
    props: {
      data: (await import('../content/home.json')).default,
      posts: parsed,
    },
  };
};
