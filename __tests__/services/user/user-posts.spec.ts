import { Post } from '@prisma/client'
import * as Repository from '../../../src/repository'
import { userPosts } from '../../../src/service/user'
import { mockedRejectError } from '../../mocks/error-message'
import { mockedPostData } from '../../mocks/post-data'

jest.mock('../../../src/repository/posts', () => ({
  postsByUserId: jest.fn(async (): Promise<Post[]> => await Promise.resolve(mockedPostData))
}))

const makeSut = (): any => {
  const sut = { userPosts }
  return { sut }
}

describe('User posts', () => {
  const fakeUserId: string = '1'
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the repository with correct value', async () => {
    const { sut } = makeSut()
    const postsByUserIdSpy = jest.spyOn(Repository, 'postsByUserId')
    await sut.userPosts(fakeUserId)
    expect(postsByUserIdSpy).toBeCalledWith(fakeUserId)
  })

  it('should return with correct values', async () => {
    const { sut } = makeSut()
    const posts = await sut.userPosts(fakeUserId)
    expect(posts).toEqual(mockedPostData)
  })

  it('should should call repository only one time', async () => {
    const { sut } = makeSut()
    const postsByUserIdSpy = jest.spyOn(Repository, 'postsByUserId')
    await sut.userPosts(fakeUserId)
    expect(postsByUserIdSpy).toBeCalledTimes(1)
  })

  it('should throw if repository throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Repository, 'postsByUserId')
      .mockRejectedValueOnce(new Error(mockedRejectError))
    const posts = sut.userPosts(fakeUserId)
    await expect(posts).rejects.toThrow(mockedRejectError)
  })
})
