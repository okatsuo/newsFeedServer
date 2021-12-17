import { Post } from '@prisma/client'
import { prismaClient } from '../shared/prisma'

export const postsByUserId = async (userId: string): Promise<Post[]> => {
  return await prismaClient.post.findMany({ where: { userId } })
}
