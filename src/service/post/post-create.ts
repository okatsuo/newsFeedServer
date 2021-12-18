import { Post } from '@prisma/client'

import { PostCreateInput } from '../../inputs'
import * as Repository from '../../repository'
import { uploadFile } from '../upload-file'

export const postaCreate = async (fields: PostCreateInput): Promise<Post> => {
  const { image, ...postFields } = fields
  const imageUrl = image ? await uploadFile('postImage', image) as string : undefined
  return await Repository.postCreate({ ...postFields, imageUrl })
}
