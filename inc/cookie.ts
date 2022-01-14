import { serialize, parse }                     from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const TOKEN_NAME  = 'cur_user'
const expiryHours = 48

export const MAX_AGE = 60 * 60 * expiryHours * 1000

export const setTokenCookie = (response: NextApiResponse, token: string) => {

  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  response.setHeader('Set-Cookie', cookie)
  response.status(200).json({message: 'ok'})

}

export function removeTokenCookie(response: NextApiResponse) {

  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  response.setHeader('Set-Cookie', cookie)
  response.status(200).json({message: 'ok'})

}

export function parseCookies(request: NextApiRequest) {

  // For API Routes we don't need to parse the cookies.
  if (request.cookies) return request.cookies

  // For pages we do need to parse the cookies.
  const cookie = request.headers?.cookie

  return parse(cookie || '')

}

export const getTokenCookie = (request: NextApiRequest) => {
  const cookies = parseCookies(request)
  return cookies[TOKEN_NAME]
}