import { User } from '@prisma/client'
import { UserUpdateInput } from '../../inputs'
import * as Repository from '../../repository'
import { uploadFile } from '../upload-file'

export const userUpdate = async (userId: string, fields: UserUpdateInput): Promise<User> => {
  const picture = fields.picture
    ? await uploadFile('user-picture', fields.picture)
    : undefined

  return await Repository.userUpdate(userId, { ...fields, picture })
}
