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

export default function About({ file }) {
  const [data, form] = useGithubMarkdownForm(file, {
    label: 'About Page',
    fields: [
      { label: 'Author', name: 'frontmatter.author', component: 'text' },
      { label: 'Dato', name: 'frontmatter.date', component: 'date' },
      { label: 'Header', name: 'frontmatter.header', component: 'text' },
      createImageField('Banner image', 'frontmatter.banner'),
      { label: 'Content', name: 'markdownBody', component: 'markdown' },
    ],
  });

  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <Layout>
      <div className={styles.pagelayout}>
        <div className={styles.bannerContainer}>
          {data.frontmatter.banner ? (
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 30%"
              src={data.frontmatter.banner}
            ></Image>
          ) : null}
        </div>
        <h1 className={styles.bannerTitle}>{data.frontmatter.header}</h1>
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
