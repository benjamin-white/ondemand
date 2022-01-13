import { getLoginSession } from '../inc/session'
import prisma              from '../inc/prisma'

// type UserType = {}

const getCurrentUser = async (req) => { // return Promise?
  
  // const user = {}

  const user = {name: ''}
  const currentSession = await getLoginSession(req)

  if (currentSession) {
    const userSess = await prisma.user.findFirst({
      where: { id: currentSession.id }
    })
    if (user) {
      user.name = userSess.name
    }
  }
  return user

  // if (!cookieHeaders.length) return user


}

export {
  getCurrentUser
}