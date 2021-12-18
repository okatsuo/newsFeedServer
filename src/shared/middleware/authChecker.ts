import { AuthChecker } from 'type-graphql'
import * as Repository from '../../repository'
import { decodeAccessToken } from '../access-token/decode-access-token'
import { verifyUserStatus } from '../verify-user-status'

export const authChecker: AuthChecker<{authorization: string}> = async ({ context }, roles) => {
  try {
    if (!context.authorization) return false

    const accessTokenInfo = decodeAccessToken(context.authorization)
    if (!accessTokenInfo?.userId) return false

    const user = await Repository.userById(accessTokenInfo.userId)
    if (!user) return false

    if (!roles.length) return true

    if (!roles.includes(user.role)) return false

    verifyUserStatus(user.status)

    return true
  } catch (error) {
    return false
  }
}
