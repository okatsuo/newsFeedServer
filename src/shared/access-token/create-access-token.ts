import { sign } from 'jsonwebtoken'
import { appConfig } from '../config'

export const createAccessToken = (userId: string): string => {
  return sign({ userId }, appConfig.secretKey, { expiresIn: appConfig.expireToken })
}
