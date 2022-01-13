
import { GetServerSideProps } from 'next'
import { getCurrentUser }     from '../inc/user'
import Layout                 from '../components/layout/Layout'
import FormUserCreate         from '../components/form-user-create/FormUserCreate'

type User = {
  name: string
}

type Props = {
  user: User
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // if !signed in offer login or create
  // if signed in redirect to manage (update PW, name, email, etc) [Router.push(route!)]
  const user = await getCurrentUser(req)
  return { props: { user } }
}

const Page: React.FC<Props> = ({ user }) => {

  const content = user?.name ? <h1>hello {user.name}</h1> : <FormUserCreate />

  return (
    <Layout user={user}>
      {content}
    </Layout>
  )

}

export default Page