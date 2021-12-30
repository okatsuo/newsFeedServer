import { Post } from '@prisma/client'

export const mockedPostData: Post[] = [{
  id: 'valid_id',
  userId: 'valid_userId',
  text: 'valid_text',
  imageUrl: 'valid_imageUrl',
  created_at: new Date(),
  updated_at: new Date()
}]
