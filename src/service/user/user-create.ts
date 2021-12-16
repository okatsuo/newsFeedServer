import { User } from '@prisma/client'
import { UserCreateInput } from '../../inputs/user'
import * as Repository from '../../repository'
import { encrypt } from '../../shared/cryptografy'

export const userCreate = async (fields: UserCreateInput): Promise<User> => {
  const hashedPassword = await encrypt(fields.password)
  const newUser = await Repository.userCreate({
    ...fields, password: hashedPassword
  })
  return newUser
}
