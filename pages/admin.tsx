import { EditContent } from '../components/EditContent';
import Layout from '../components/Layout';

export default function Admin({ cms }) {
  return (
    <Layout>
      <p>Please log in to edit the content on this site.</p>
      <EditContent cms={cms} />
    </Layout>
  );
}
