import { GetServerSideProps }       from 'next'
import { getCurrentUser, UserType } from '../inc/user'
import Layout                       from '../components/layout/Layout'
import HeaderPage                   from '../components/header-page/HeaderPage'

type Props = {
  user: UserType|null
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getCurrentUser(req)
  return { props: { user } }
}

const Page: React.FC<Props> = ({ user }) => 
  <Layout user={user}>
    <HeaderPage title="Main Site Content" />
  </Layout>

export default Page
