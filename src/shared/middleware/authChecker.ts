import { AuthChecker } from 'type-graphql'
import * as Repository from '../../repository'
import { decodeAccessToken } from '../access-token/decode-access-token'
import { loggedUser } from '../logged-user'
import { verifyUserStatus } from '../verify-user-status'

export const authChecker: AuthChecker<{authorization: string}> = async ({ context }, roles) => {
  try {
    if (!context.authorization) return false

    const accessTokenInfo = decodeAccessToken(context.authorization)
    if (!accessTokenInfo.userId) return false

    const user = await Repository.userById(accessTokenInfo.userId)
    if (!user) return false

    loggedUser.id = user.id
    loggedUser.role = user.role
    verifyUserStatus(user.status)

    if (!roles.length) return true

    if (!roles.includes(user.role)) return false

    return true
  } catch (error) {
    return false
  }
}
