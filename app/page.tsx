import Image from "next/image";
import styles from "./styles/home.module.css";
import Layout from "./components/layout/layout";

import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/app/content/home.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <Layout>
      <div className={styles.layout}>
        {data.logo ? (
          <div className={styles.logoContainer}>
            <Image
              priority={true}
              src={data.logo}
              alt="VRNoAF logo stor"
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
                objectPosition: "top",
              }}
            ></Image>
          </div>
        ) : null}
        {data.banner ? (
          <div className={styles.bannerContainer}>
            <Image
              priority={true}
              src={data.banner}
              alt="banner image"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
            ></Image>
          </div>
        ) : null}
        {/* <h1 className={styles.bannerTitle}>{data.header}</h1> */}
        {/* <div className={styles.postsContainer}>
          {posts.map((p, i) => (
            <PostContent
              key={i}
              data={p.data}
              content={p.content}
            ></PostContent>
          ))}
        </div> */}
      </div>
    </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async function () {
//   const posts = glob.sync("content/posts/**/*.md");

//   //remove path and extension to leave filename only
//   const postSlugs = posts.map((file) =>
//     file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
//   );

//   const postsContent = postSlugs.map(
//     async (slug) => await import(`../content/posts/${slug}.md`)
//   );

//   const parsed = (await Promise.all(postsContent))
//     .map((imported) => matter(imported.default))
//     .sort((a, b) => {
//       return b.data.date - a.data.date;
//     })
//     .map((p) => ({
//       data: { ...p.data, date: p.data.date.toISOString() },
//       content: p.content,
//     }));

//   return {
//     props: {
//       data: (await import("./content/home.json")).default,
//       posts: parsed,
//     },
//   };
// };
