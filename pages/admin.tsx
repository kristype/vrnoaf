import { EditContent } from '../components/EditContent';
import { Head } from '../components/Head';
import Layout from '../components/layout/Layout';

export default function Admin({ cms }) {
  return (
    <Layout>
      <Head title={'Admin'}></Head>
      <p>Please log in to edit the content on this site.</p>
      <EditContent cms={cms} />
    </Layout>
  );
}
