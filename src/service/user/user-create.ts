import { UserCreateInput } from '../../inputs/user'
import * as Repository from '../../repository'
import { UserSchema } from '../../schemas/user-schema'
import { encrypt } from '../../shared/cryptografy'

export const userCreate = async (fields: UserCreateInput): Promise<UserSchema> => {
  const hashedPassword = await encrypt(fields.password)
  const newUser: UserSchema = await Repository.userCreate({
    ...fields, password: hashedPassword
  })
  return newUser
}
