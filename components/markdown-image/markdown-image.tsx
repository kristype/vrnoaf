import styles from './markdown-image.module.css';
import Image from 'next/image';

export interface MarkdownImageProps {
  src: string;
  title: string;
  alt: string;
}

export default function MarkdownImage(props: MarkdownImageProps) {
  if (props.src.startsWith('/'))
    return (
      <Figure title={props.title}>
        <a
          href={`/_next/image?url=${encodeURIComponent(
            props.src
          )}&w=3840&q=100`}
        >
          <Image
            src={props.src}
            layout="responsive"
            height={400}
            width={700}
            objectPosition="center center"
            objectFit="cover"
            title={props.title}
            alt={props.alt}
          ></Image>
        </a>
      </Figure>
    );
  else
    return (
      <Figure title={props.title}>
        <img className={styles.image} {...props}></img>{' '}
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
