import { UserCreateInput } from '../inputs/user'
import { UserSchema } from '../schemas/user-schema'
import { prismaClient } from '../shared/prisma'

export const users = async (): Promise<UserSchema[]> => {
  return await prismaClient.user.findMany()
}

export const userCreate = async (fields: UserCreateInput): Promise<UserSchema> => {
  return await prismaClient.user.create({ data: fields })
}
