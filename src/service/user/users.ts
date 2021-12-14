import { UserSchema } from '../../schemas/user-schema'
import { prismaClient } from '../../shared/prisma'

export const usersService = async (): Promise<UserSchema[]> => {
  return await prismaClient.user.findMany()
}
