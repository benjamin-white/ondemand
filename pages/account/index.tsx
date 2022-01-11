
import { GetServerSideProps } from 'next'
import { getLoginSession }    from '../../inc/session'
import Layout                 from "../../components/Layout"
import FormCreate             from '../../components/account/FormCreate'
import prisma                 from '../../inc/prisma'

// if !signed in offer login or create
// if signed in redirect to manage (update PW, name, email, etc) [Router.push(route!)]

type Props = {
  currentUser: object
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => { // uses ServerSideProps to read logged in cookie, maybe refactor

  const currentUser = {name: ''}
  const currentSession = await getLoginSession(req)

  if (currentSession) {
    const user = await prisma.user.findFirst({
      where: { id: currentSession.id }
    })
    if (user) {
      currentUser.name = user.name
    }
  }

  // const currentUser = getCurrentUser(req.headers?.cookie)// {name: 'Frank'}

  return { props: { currentUser } }

}

const AccountCreate: React.FC<Props> = (props) => {
  return (
    <Layout user={props.currentUser}>
      <FormCreate />
    </Layout>
  )
}

export default AccountCreate