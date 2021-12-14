import { decode } from 'jsonwebtoken'

interface decodeAccessTokenReturn {
  userId: string
}

interface IAccessToken {
  userId: string
}

export const decodeAccessToken = (token: string): decodeAccessTokenReturn => {
  const accessTokenInfo = decode(token) as IAccessToken
  return accessTokenInfo
}
