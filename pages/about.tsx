import { usePlugin } from 'tinacms';
import {
  useGithubMarkdownForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github';
import ReactMarkdown from 'react-markdown';
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import styles from '../styles/about.module.css';
import Layout from '../components/layout/Layout';
import { createImageField } from '../commons/imageFieldResolver';
import { Head } from '../components/Head';

export default function About({ file }) {
  const [data, form] = useGithubMarkdownForm(file, {
    label: 'About Page',
    fields: [
      { label: 'Header', name: 'frontmatter.header', component: 'text' },
      createImageField('Banner image', 'frontmatter.banner'),
      {
        label: 'Banner center',
        name: 'frontmatter.bannerCenter',
        component: 'number',
        description:
          'Hvor senteret på bildet skal være. Tall mellom 1 - 100 i prosent. 50 = senter',
        defaultValue: 50,
      },
      { label: 'Content', name: 'markdownBody', component: 'markdown' },
    ],
  });

  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <Layout>
      <Head title={data.bannerTitle}></Head>
      <div className={styles.pageLayout}>
        <div className={styles.bannerContainer}>
          {data.frontmatter.banner ? (
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              objectPosition={`50% ${data.frontmatter.bannerCenter}%`}
              src={data.frontmatter.banner}
            ></Image>
          ) : null}
        </div>
        <section className={styles.titleSection}>
          <h1 className={styles.title}>{data.frontmatter.header}</h1>
        </section>
        <div className={styles.content}>
          <ReactMarkdown className="markdown">
            {data.markdownBody}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/about.md',
      parse: parseMarkdown,
    });
  }
  return {
    props: {
      error: null,
      file: {
        fileRelativePath: 'content/about.md',
        data: parseMarkdown((await import('../content/about.md')).default),
      },
    },
  };
};
