import styles from "./markdown-image.module.css";
import Image from "next/image";

export interface MarkdownImageProps {
  src: string;
  title: string;
  alt: string;
}

export default function MarkdownImage(props: MarkdownImageProps) {
  if (props.src.startsWith("/"))
    return (
      <Figure title={props.title}>
        <a
          href={`/_next/image?url=${encodeURIComponent(
            props.src
          )}&w=3840&q=100`}
        >
          <Image
            src={props.src}
            height={400}
            width={700}
            title={props.title}
            alt={props.alt}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center center"
            }}></Image>
        </a>
      </Figure>
    );
  else
    return (
      <Figure title={props.title}>
        <img className={styles.image} {...props}></img>{" "}
      </Figure>
    );
}

function Figure({ title, children }) {
  return (
    <figure>
      {children}
      <figcaption>{title}</figcaption>
    </figure>
  );
}
