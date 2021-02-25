import { usePlugin, FormOptions, Field, ImageField } from "tinacms";
import {
  useGithubMarkdownForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";
import ReactMarkdown from "react-markdown";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import { GetStaticProps } from "next";
import Image from "next/image";
import { ImageProps } from "react-tinacms-editor/dist/src/types";
import styles from "../styles/About.module.css";

export default function About({ file }) {
  const imageField: Field & ImageProps = {
    label: "Banner image",
    name: "frontmatter.banner",
    component: "image",
    parse: (media) => `/static/${media.filename}`,
    uploadDir: () => "/public/static/",
    previewSrc: (fullSrc) => fullSrc,
  };
  const [data, form] = useGithubMarkdownForm(file, {
    label: "About Page",
    fields: [
      { label: "Author", name: "frontmatter.author", component: "text" },
      { label: "Dato", name: "frontmatter.date", component: "date" },
      { label: "Header", name: "frontmatter.header", component: "text" },
      imageField,
      {  label: "Content", name: "markdownBody", component: "markdown" },
    ],
  });

  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <div className={styles.pageLayout}>
      <div className={styles.bannerContainer}>
        {data.frontmatter.banner ? (
          <Image
            priority={true}
            layout="fill"
            objectFit="cover"
            objectPosition="100% 30%"
            src={data.frontmatter.banner}
          ></Image>
        ) : null}
      </div>
      <h1 className={styles.bannerTitle}>{data.frontmatter.header}</h1>
      <div className={styles.content}>
        <ReactMarkdown>{data.markdownBody}</ReactMarkdown>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/about.md",
      parse: parseMarkdown,
    });
  }
  return {
    props: {
      error: null,
      file: {
        fileRelativePath: "content/about.md",
        data: parseMarkdown((await import("../content/about.md")).default),
      },
    },
  };
};
