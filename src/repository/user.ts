import { User } from '@prisma/client'
import { UserCreateInput } from '../inputs/user'
import { prismaClient } from '../shared/prisma'

export const users = async (): Promise<User[]> => {
  return await prismaClient.user.findMany()
}

export const userCreate = async (fields: UserCreateInput): Promise<User> => {
  return await prismaClient.user.create({ data: fields })
}

export const userByEmail = async (email: string): Promise<User | null> => await prismaClient.user.findUnique({ where: { email } })

export const userById = async (id: string): Promise<User | null> => await prismaClient.user.findUnique({ where: { id } })
