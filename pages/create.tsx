import Layout     from '../components/layout/Layout'
import HeaderPage from '../components/header-page/HeaderPage'
import FormMinter from '../components/form-minter/FormMinter'

const Page: React.FC = () =>
  <Layout user={null}>
    <HeaderPage title="Minter" />
    <FormMinter />
  </Layout>

export default Page