import { UserCreateInput } from '../../inputs/user'
import { userCreateRepository } from '../../repository'
import { UserSchema } from '../../schemas/user-schema'

export const userCreate = async (fields: UserCreateInput): Promise<UserSchema> => {
  const newUser: UserSchema = await userCreateRepository(fields)
  return newUser
}
