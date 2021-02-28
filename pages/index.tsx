import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { GetStaticProps } from 'next';
import { usePlugin } from 'tinacms';
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github';

import Image from 'next/image';

import styles from '../styles/home.module.css';
import { createImageField } from '../commons/imageFieldResolver';
import Layout from '../components/layout/Layout';
import { Head } from '../components/Head';

export default function Home({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { label: 'Header', name: 'title', component: 'text' },
      createImageField('Logo', 'logo'),
      createImageField('Banner image', 'banner'),
    ],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <Layout>
      <Head title="VRNOAF"></Head>

      <div className={styles.pageLayout}>
        {data.logo ? (
          <div className={styles.logoContainer}>
            <Image
              priority={true}
              layout="fill"
              objectFit="contain"
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
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  };
};
