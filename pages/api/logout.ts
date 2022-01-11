import { removeTokenCookie }                    from '../../inc/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const logout = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

  if (req.method !== 'POST') {
    res.status(404).end()
    return
  }

  // need to check nonce/verify request authenticity
  removeTokenCookie(res)

}

export default logout