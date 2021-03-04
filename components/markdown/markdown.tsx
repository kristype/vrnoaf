import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownImage from '../markdown-image/markdown-image';
import styles from './markdown.module.css';

const renderers = {
  image: (props: any): ReactElement => (
    <MarkdownImage {...props}></MarkdownImage>
  ),
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown className={styles.markdown} renderers={renderers}>
      {children}
    </ReactMarkdown>
  );
}
