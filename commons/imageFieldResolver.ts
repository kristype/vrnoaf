import { Field } from 'tinacms';
import { ImageProps } from 'react-tinacms-editor/dist/src/types';

export const createImageField = (label, name): Field & ImageProps => {
  return {
    label: label,
    name: name,
    component: 'image',
    parse: (media) => `/static/${media.filename}`,
    uploadDir: () => '/public/static/',
    previewSrc: (fullSrc) => fullSrc,
  };
};
