import { UserCreateInput } from '../inputs/user'
import { UserSchema } from '../schemas/user-schema'
import { prismaClient } from '../shared/prisma'

export const usersRepository = async (): Promise<UserSchema[]> => {
  return await prismaClient.user.findMany()
}

export const userCreateRepository = async (fields: UserCreateInput): Promise<UserSchema> => {
  return await prismaClient.user.create({ data: fields })
}
