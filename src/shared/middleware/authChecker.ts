import { AuthChecker } from 'type-graphql'
import * as Repository from '../../repository'
import { decodeAccessToken } from '../access-token/decode-access-token'
import { verifyUserStatus } from '../verify-user-status'

export const authChecker: AuthChecker<{authorization: string}> = async ({ root, args, context, info }, roles) => {
  try {
    const accessTokenInfo = decodeAccessToken(context.authorization)
    const user = await Repository.userById(accessTokenInfo.userId)
    if (!user) return false
    if (!roles.includes(user.role)) return false
    verifyUserStatus(user.status)
    return true
  } catch {
    return false
  }
}
