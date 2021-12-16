import { User } from '@prisma/client'
import * as Repository from '../../repository'

export const users = async (): Promise<User[]> => {
  const users = await Repository.users()
  return users
}
