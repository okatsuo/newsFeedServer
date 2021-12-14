import { verify } from 'jsonwebtoken'
import { appConfig } from '../config'

interface decodeAccessTokenReturn {
  userId: string
}

interface IAccessToken {
  userId: string
}

export const decodeAccessToken = (token: string): decodeAccessTokenReturn => {
  const accessTokenInfo = verify(token, appConfig.secretKey) as IAccessToken
  return accessTokenInfo
}
