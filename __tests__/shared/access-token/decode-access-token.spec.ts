import { decodeAccessToken, IAccessToken } from '../../../src/shared/access-token/decode-access-token'
import jwt from 'jsonwebtoken'
import { appConfig } from '../../../src/shared/config'

const mockedVerifyReturn: IAccessToken = { userId: 'valid_id' }

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token: string): IAccessToken => mockedVerifyReturn)
}))

type SutType = {
  sut: {decodeAccessToken: typeof decodeAccessToken}
}

const makeSut = (): SutType => {
  const sut = { decodeAccessToken }
  return { sut }
}

describe('Decode access token', () => {
  const fakeToken = 'valid_token'
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the JWT Verify with correct values', () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'verify')
    sut.decodeAccessToken(fakeToken)
    expect(jwtSpy).toBeCalledWith(fakeToken, appConfig.secretKey)
  })

  it('should call JWT Verify only one time', () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'verify')
    sut.decodeAccessToken(fakeToken)
    expect(jwtSpy).toBeCalledTimes(1)
  })

  it('should return with correct values', () => {
    const { sut } = makeSut()
    const accessToken = sut.decodeAccessToken(fakeToken)
    expect(accessToken).toEqual(mockedVerifyReturn)
  })
})
