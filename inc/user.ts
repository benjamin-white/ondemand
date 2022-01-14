import { getLoginSession }     from '../inc/session'
import prisma                  from '../inc/prisma'

const getCurrentUser = async (request): Promise<object|null> => {

  const session = await getLoginSession(request)

  if (session) {
    const user = await prisma.user.findFirst({where: {id: session.id}})
    if (user) return {name: user.name}
  }

  return null

}

export {
  getCurrentUser
}

export type UserType = {
  name: string
}