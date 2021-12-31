import { AuthChecker } from 'type-graphql'
import * as Repository from '../../repository'
import { decodeAccessToken } from '../access-token/decode-access-token'
import { loggedUser } from '../logged-user'
import { verifyUserStatus } from '../verify-user-status'

export const authChecker: AuthChecker<{authorization: string}> = async ({ context }, roles) => {
  const authenticated = true
  const unauthenticated = false
  try {
    if (!context.authorization) return unauthenticated

    const accessTokenInfo = decodeAccessToken(context.authorization)
    if (!accessTokenInfo.userId) return unauthenticated

    const user = await Repository.userById(accessTokenInfo.userId)
    if (!user) return unauthenticated

    loggedUser.id = user.id
    loggedUser.role = user.role
    verifyUserStatus(user.status)

    if (!roles.length) return authenticated

    if (!roles.includes(user.role)) return unauthenticated

    return authenticated
  } catch (error) {
    return unauthenticated
  }
}
