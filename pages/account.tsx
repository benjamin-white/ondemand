
import { GetServerSideProps }       from 'next'
import { getCurrentUser, UserType } from '../inc/user'
import Layout                       from '../components/layout/Layout'
import FormUserCreate               from '../components/form-user-create/FormUserCreate'
import DashboardUser                from '../components/dashboard-user/DashboardUser'

type Props = {
  user: UserType|null
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getCurrentUser(req)
  return { props: { user } }
}

const Page: React.FC<Props> = ({ user }) => {

  return (
    <Layout user={user}>
      {user ? <DashboardUser user={user} /> : <FormUserCreate />}
    </Layout>
  )

}

export default Page