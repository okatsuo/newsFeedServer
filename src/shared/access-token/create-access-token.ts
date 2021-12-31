import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { appConfig } from '../config'

export const createAccessToken = (userId: User['id']): string => {
  return sign({ userId }, appConfig.secretKey, { expiresIn: appConfig.expireToken })
}
