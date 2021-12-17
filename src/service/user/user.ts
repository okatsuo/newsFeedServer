import { User } from '@prisma/client'
import * as UserService from '../../repository'

export const user = async (userId: string): Promise<User | null> => {
  return await UserService.userById(userId)
}
