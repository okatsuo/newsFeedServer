import { Post } from '@prisma/client'
import { postsByUserId } from '../../repository/posts'

export const userPosts = async ({ userId }: Pick<Post, 'userId'>): Promise<Post[]> => {
  return await postsByUserId({ userId })
}
