import Iron                                        from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookie'
import type { NextApiRequest, NextApiResponse }    from 'next'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(response: NextApiResponse, session) {

  const createdAt = Date.now()
  const obj       = {...session, createdAt, maxAge: MAX_AGE}
  const token     = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(response, token)

}

type SessionType = {
  id: number
}

export async function getLoginSession(request: NextApiRequest): Promise<SessionType|void> {

  const token = getTokenCookie(request)

  if (!token) return

  try {
    const session   = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge
    if (Date.now() > expiresAt) return
    return session
  } catch (error) {
    console.error('Unable to retrieve session')
    return
  }

}