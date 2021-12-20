import { Post } from '@prisma/client'

import { PostCreateInputWithImageUrl } from '../inputs'
import { prismaClient } from '../shared/prisma'

export const postsByUserId = async (userId: string): Promise<Post[]> => await prismaClient.post.findMany({ where: { userId } })

export const posts = async (): Promise<Post[]> => await prismaClient.post.findMany()

export const postsByCreatedAt = async (): Promise<Post[]> => await prismaClient.post.findMany({
  orderBy: {
    created_at: 'desc'
  }
})

export const postCreate = async (fields: PostCreateInputWithImageUrl): Promise<Post> => await prismaClient.post.create({ data: fields })
