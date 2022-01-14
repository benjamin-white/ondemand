import crypto                                   from 'crypto'
import prisma                                   from '../../inc/prisma'
import { setLoginSession}                       from '../../inc/session'
import type { NextApiRequest, NextApiResponse } from 'next'

const login = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') {
    res.status(404).end()
    return
  }

  const { email, pass } = req.body

  const user = await prisma.user.findFirst({where: {email: email}})

  if (!user) {
    res.status(200).json({message: 'no email found'})
    return
  }

  const inputHash = crypto
    .pbkdf2Sync(pass, user.salt, 1000, 64, 'sha512')
    .toString('hex')

  if (user.pass === inputHash) {
    setLoginSession(res, {id: user.id})
    // res.status(200).json({message: 'all good'})
  } else {
    res.status(200).json({message: 'no match'})
  }

}

export default login