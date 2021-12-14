import * as Repository from '../../repository'
import { UserSchema } from '../../schemas/user-schema'

export const users = async (): Promise<UserSchema[]> => {
  const users: UserSchema[] = await Repository.users()
  return users
}
