import { UserStatus } from '@prisma/client'
import { messagesIfUserIsNotActive, verifyUserStatus } from '../../../src/shared/verify-user-status'

type SutType = {
  sut: {verifyUserStatus: typeof verifyUserStatus}
}

const makeSut = (): SutType => {
  const sut = { verifyUserStatus }
  return { sut }
}

describe('Verify user status', () => {
  it('should return undefined if user status is active', () => {
    const { sut } = makeSut()
    const sutReturn = sut.verifyUserStatus(UserStatus.active)
    expect(sutReturn).toBe(undefined)
  })

  it('should throw if user is disabled', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.verifyUserStatus(UserStatus.disabled)
    }).toThrow(messagesIfUserIsNotActive[UserStatus.disabled])
  })

  it('should throw if user is banned', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.verifyUserStatus(UserStatus.banned)
    }).toThrow(messagesIfUserIsNotActive[UserStatus.banned])
  })

  it('should return undefined if the status is not handled yet', () => {
    const { sut } = makeSut()
    const sutReturn = sut.verifyUserStatus('unhandled_status' as UserStatus)
    expect(sutReturn).toBe(undefined)
  })
})
