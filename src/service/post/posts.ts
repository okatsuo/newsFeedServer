import { Post } from '@prisma/client'
import * as Repository from '../../repository'

export const posts = async (): Promise<Post[]> => {
  return await Repository.posts()
}
