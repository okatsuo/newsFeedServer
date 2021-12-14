import { hash, genSalt } from 'bcrypt'

export const encrypt = async (value: string): Promise<string> => {
  const salt = await genSalt()
  return await hash(value, salt)
}
