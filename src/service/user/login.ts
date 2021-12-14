import * as Repository from '../../repository'
import { UserAuthenticationSchema } from '../../schemas/user-authentication'
import { createAccessToken } from '../../shared/access-token'
import { compareHash } from '../../shared/cryptografy'
import { UserStatus } from '../../shared/enums'
import { verifyUserStatus } from '../../shared/verify-user-status'

export const UserAuthentication = async (email: string, password: string): Promise<UserAuthenticationSchema> => {
  const user = await Repository.userByEmail(email)
  if (!user) throw new Error('Credenciais inválidas')
  const isValidPassword = await compareHash({ data: password, encrypted_data: user.password })
  if (!isValidPassword) throw new Error('Credenciais inválidas')

  verifyUserStatus(user.status as UserStatus)

  const token = createAccessToken(user.id)
  return { token, user }
}
