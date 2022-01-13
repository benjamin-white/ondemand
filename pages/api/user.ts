import prisma                                   from '../../inc/prisma'
import crypto                                   from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

const createUser = async (name, email, pass) => {

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(pass, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = await prisma.user.create({
    data: {
      email,
      name,
      pass: hash,
      salt
    }
  })

  return user

}

const handle = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

  if (req.method === 'POST') {

    const { name, email, pass } = req.body

    // is password strong?
  
    const nameExists = await prisma.user.findFirst({where: {name: name}})
    if (nameExists) {
      res.status(200).json({message: 'Name Exists'})
      return
    }

    const emailExists = await prisma.user.findFirst({where: {email: email}})
    if (emailExists) {
      res.status(200).json({message: 'Email Exists'})
      return
    }

    createUser(name, email, pass)
  
    res.status(200).json({message: 'New User Created'})
    return

  }

  res.status(404).end()

}

export default handle