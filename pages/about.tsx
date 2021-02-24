import { usePlugin } from "tinacms";
import {
  useGithubMarkdownForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";
import ReactMarkdown from "react-markdown";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import { GetStaticProps } from "next";
import Image from "next/image";

export default function About({ file }) {
  const formOptions = {
    label: "About Page",
    fields: [
      { name: "frontmatter.author", component: "text" },
      { name: "frontmatter.date", component: "date" },
      { name: "frontmatter.banner", component: "image" },
      { name: "markdownBody", component: "markdown" },
    ],
  };
  const [data, form] = useGithubMarkdownForm(file, formOptions);

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
