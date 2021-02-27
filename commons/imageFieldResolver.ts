import { Field } from 'tinacms';
import { ImageProps } from 'react-tinacms-editor/dist/src/types';

export const createImageField = (label, name): Field & ImageProps => {
  return {
    label: label,
    name: name,
    component: 'image',
    parse: (media) => `/static/images/${media.filename}`,
    uploadDir: () => '/public/static/images/',
    previewSrc: (fullSrc) => fullSrc,
  };
};
