import React                  from 'react'
import { GetServerSideProps } from 'next'
import { getLoginSession }    from '../inc/session'
import Layout                 from '../components/Layout'
import Post, { PostProps }    from '../components/Post'
import prisma                 from '../inc/prisma'

type User = {
  name: string
}

type Props = {
  feedData: PostProps[],
  currentUser: User
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
 
  const feedData = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    take: 5
  })

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

  // const currentUser = getCurrentUser(req.headers?.cookie)

  return { props: { feedData, currentUser } }

}

const Page: React.FC<Props> = (props) => 
  <Layout user={props.currentUser}>
    <div className="page">
      <h1 style={{textAlign: 'center', margin: '4rem 0 0'}}>Main Site Content</h1>
      <main>
        {props.feedData.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  </Layout>

export default Page
