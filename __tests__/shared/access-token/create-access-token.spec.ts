import { createAccessToken } from '../../../src/shared/access-token'
import jwt from 'jsonwebtoken'
import { appConfig } from '../../../src/shared/config'

const mockedAccessTokenReturn = 'valid_access_token'
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((): string => mockedAccessTokenReturn)
}))

type SutType = {
  sut: {createAccessToken: typeof createAccessToken}
}
const makeSut = (): SutType => {
  const sut = { createAccessToken }
  return { sut }
}

describe('Create access token', () => {
  const fakeUserId = 'valid_id'
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call JWT Sign with correct values', () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    sut.createAccessToken(fakeUserId)
    expect(jwtSpy).toBeCalledWith(
      { userId: fakeUserId },
      appConfig.secretKey,
      { expiresIn: appConfig.expireToken }
    )
  })

  it('should call JWT Sign only one time', () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    sut.createAccessToken(fakeUserId)
    expect(jwtSpy).toBeCalledTimes(1)
  })

  it('should return with the access token', () => {
    const { sut } = makeSut()
    const accessToken = sut.createAccessToken(fakeUserId)
    expect(accessToken).toBe(mockedAccessTokenReturn)
  })
})
