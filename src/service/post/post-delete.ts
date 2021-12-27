import { Post, UserRole } from '@prisma/client'
import * as Repository from '../../repository'
import { loggedUser } from '../../shared/logged-user'

export const postDelete = async (postId: string): Promise<Post> => {
  const post = await Repository.postById(postId)
  if (!post) throw new Error('Esse post já não existe.')

  if (loggedUser.role !== UserRole.admin) {
    if (post.userId !== loggedUser.id) throw new Error('Esse post não percente a você.')
  }

  await Repository.postDelete(postId)
  return post
}
