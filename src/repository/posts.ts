import { Post } from '@prisma/client'

import { PostCreateInputWithImageUrl } from '../inputs'
import { prismaClient } from '../shared/prisma'

export const postById = async (postId: string): Promise<Post | null> => await prismaClient.post.findUnique({ where: { id: postId } })

export const postsByUserId = async ({ userId }: Pick<Post, 'userId'>): Promise<Post[]> => await prismaClient.post.findMany({ where: { userId } })

export const posts = async (): Promise<Post[]> => await prismaClient.post.findMany()

export const postsByCreatedAt = async (): Promise<Post[]> => await prismaClient.post.findMany({
  orderBy: {
    created_at: 'desc'
  }
})

export const postCreate = async (fields: PostCreateInputWithImageUrl): Promise<Post> => await prismaClient.post.create({ data: fields })

export const postDelete = async (postId: string): Promise<Post> => await prismaClient.post.delete({ where: { id: postId } })
