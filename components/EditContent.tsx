import { TinaCMS } from 'tinacms';

export interface EditContentProps {
  cms: TinaCMS;
}

export const EditContent = ({ cms }: EditContentProps) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Log out' : 'Log in'}
    </button>
  );
};
