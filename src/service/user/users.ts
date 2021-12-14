import { usersRepository } from '../../repository'
import { UserSchema } from '../../schemas/user-schema'

export const usersService = async (): Promise<UserSchema[]> => {
  const users: UserSchema[] = await usersRepository()
  return users
}
