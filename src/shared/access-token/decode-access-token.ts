import { User } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { appConfig } from '../config'

export type IAccessToken = {
  userId: User['id']
}

export const decodeAccessToken = (token: string): IAccessToken => {
  const { userId } = verify(token, appConfig.secretKey) as IAccessToken
  return { userId }
}
