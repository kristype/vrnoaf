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
      imageField,
      { name: "markdownBody", component: "markdown" },
    ],
  });

  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <div>
      {data.frontmatter.banner ? (
        <Image width="auto" height="auto" src={data.frontmatter.banner}></Image>
      ) : null}
      <ReactMarkdown>{data.markdownBody}</ReactMarkdown>
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
