import { encrypt } from '../../../src/shared/cryptografy'
import bcrypt from 'bcrypt'
import { mockedRejectError } from '../../mocks/error-message'

const mockedGenSaltReturn = 'valid_salt'
const mockedHashReturn = 'valid_hash'
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(async (): Promise<string> => await Promise.resolve(mockedGenSaltReturn)),
  hash: jest.fn(async (value: string): Promise<string> => await Promise.resolve(mockedHashReturn))
}))

type SutType = {
  sut: {encrypt: typeof encrypt}
}

const makeSut = (): SutType => {
  const sut = { encrypt }
  return { sut }
}

describe('Ecrypt', () => {
  const mockedPassword = 'valid_password'
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the encrypt library with correct values', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(mockedPassword)
    expect(bcryptSpy).toBeCalledWith(mockedPassword, mockedGenSaltReturn)
  })

  it('should call the encrypt library only one time', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(mockedPassword)
    expect(bcryptSpy).toBeCalledTimes(1)
  })

  it('should throw if encrypt library throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash')
      .mockImplementationOnce(() => { throw new Error(mockedRejectError) })
    const hashedValue = sut.encrypt(mockedPassword)
    await expect(hashedValue).rejects.toThrow(mockedRejectError)
  })

  it('should should return with correct value', async () => {
    const { sut } = makeSut()
    const hashedValue = await sut.encrypt(mockedPassword)
    expect(hashedValue).toBe(mockedHashReturn)
  })
})
