import prisma                                   from '../../inc/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

const handle = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

  if (false && 'test_auth_here') {
    res.status(403).json({message: 'No GO'})
    return
  }

  // if (req.method === 'POST')

  const { title, content } = req.body

  if (!title || !content) {
    res.status(200).json({message: 'Missing fields'})
    return;
  }

  // const session = await getSession({ req });
  // extract data from req and get current user ID
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: 'j@jj.jjj' } },
    },
  })

  res.status(200).json({message: 'success'})

}

export default handle