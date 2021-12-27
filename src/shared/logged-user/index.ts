import { UserRole } from '@prisma/client'

export interface LoggedUser {
  id?: string | null
  role: UserRole | null
}

export const loggedUser: LoggedUser = {
  id: null,
  role: null
}
