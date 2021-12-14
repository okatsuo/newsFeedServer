import { UserStatus } from '../enums'

export const verifyUserStatus = (status: string): any => {
  if (status === UserStatus.active) return
  if (status === UserStatus.banned) throw new Error('Usuário banido')
  if (status === UserStatus.disabled) throw new Error('Usuário desativado')
  throw new Error('algo de errado não está certo...')
}
