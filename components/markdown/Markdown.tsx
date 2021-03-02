import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from './markdown.module.css';

const renderers = {
  image: (props) => {
    if (props.src.startsWith('/'))
      return (
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
      );
    else return <img className={styles.image} {...props}></img>;
  },
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown className={styles.markdown} renderers={renderers}>
      {children}
    </ReactMarkdown>
  );
}
