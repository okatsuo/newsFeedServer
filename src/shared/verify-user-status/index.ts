import { UserStatus } from '@prisma/client'

export const messagesIfUserIsNotActive = {
  [UserStatus.banned]: 'Usuário banido',
  [UserStatus.disabled]: 'Usuário desativado',
  notRecognized: 'Erro interno no teu status do sistema, por favor entre em contato conosco.'
}
export const verifyUserStatus = (status: UserStatus): void => {
  // @ts-expect-error
  if (messagesIfUserIsNotActive[status]) {
    // @ts-expect-error
    throw new Error(messagesIfUserIsNotActive[status])
  }
}
