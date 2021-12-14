import { hash, genSalt, compare } from 'bcrypt'

interface compareHashProps {
  data: string
  encrypted_data: string
}

export const encrypt = async (value: string): Promise<string> => {
  const salt = await genSalt()
  return await hash(value, salt)
}

export const compareHash = async (value: compareHashProps): Promise<boolean> => await compare(value.data, value.encrypted_data)
