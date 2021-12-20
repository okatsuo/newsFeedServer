import { User } from '@prisma/client'
import * as Repository from '../../repository'
import { decodeAccessToken } from '../../shared/access-token/decode-access-token'

export const userProfile = async (userToken: string): Promise<User | null> => {
  const userInfo = decodeAccessToken(userToken)
  const user = await Repository.userById(userInfo.userId)
  return user
}
