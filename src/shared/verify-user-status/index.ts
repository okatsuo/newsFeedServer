import { UserStatus } from '../enums'

export const verifyUserStatus = (status: UserStatus): any => {
  if (status === UserStatus.banned) throw new Error('Usuário banido')
  if (status === UserStatus.disabled) throw new Error('Usuário desativado')
}
