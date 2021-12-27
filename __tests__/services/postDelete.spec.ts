import { Post, UserRole } from '@prisma/client'
import * as Repository from '../../src/repository'
import { postDelete } from '../../src/service/post/post-delete'
import { loggedUser } from '../../src/shared/logged-user'

const fakePost: Post = {
  id: 'valid_id',
  userId: 'valid_userId',
  imageUrl: 'valid_link',
  text: 'valid_text',
  created_at: new Date(),
  updated_at: new Date()
}

jest.mock('../../src/shared/logged-user', () => ({
  loggedUser: {
    userId: 'valid_userId',
    role: UserRole.admin
  }
}))

jest.mock('../../src/repository', () => ({
  postById: jest.fn(async (): Promise<Post | null> => await Promise.resolve(fakePost)),
  postDelete: jest.fn(async (): Promise<Post | null> => await Promise.resolve(fakePost))
}))

describe('Post delete service', () => {
  const fakePostId = 'valid_id'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw with correct messages if no post is found', async () => {
    jest.spyOn(Repository, 'postById').mockImplementationOnce(async () => await Promise.resolve(null))
    const post = postDelete(fakePostId)
    await expect(post).rejects.toThrow('Esse post já não existe.')
  })

  it('should throw if a user tries to delete a post that he doesnt own', async () => {
    loggedUser.id = 'invalid_userId'
    loggedUser.role = UserRole.user
    const post = postDelete(fakePostId)
    await expect(post).rejects.toThrow('Esse post não percente a você.')
  })

  it('should call the repository postDelete with correct postId if the user is admin', async () => {
    loggedUser.id = 'valid_userId'
    loggedUser.role = UserRole.admin
    const repositoryPostDeleteSpy = jest.spyOn(Repository, 'postDelete')
    await postDelete(fakePostId)
    expect(repositoryPostDeleteSpy).toBeCalledWith(fakePostId)
    expect(repositoryPostDeleteSpy).toBeCalledTimes(1)
  })

  it('should call the repository postDelete with correct postId if the user is own of the post', async () => {
    loggedUser.id = 'valid_userId'
    loggedUser.role = UserRole.user

    const repositoryPostDeleteSpy = jest.spyOn(Repository, 'postDelete')
    await postDelete(fakePostId)
    expect(repositoryPostDeleteSpy).toBeCalledWith(fakePostId)
    expect(repositoryPostDeleteSpy).toBeCalledTimes(1)
  })

  it('should return with correct values if is a valid user', async () => {
    loggedUser.id = 'valid_userId'
    loggedUser.role = UserRole.user

    const post = await postDelete(fakePostId)
    expect(post).toEqual(fakePost)
  })

  it('should return with correct values if is a valid admin', async () => {
    loggedUser.id = 'valid_adminId'
    loggedUser.role = UserRole.admin

    const post = await postDelete(fakePostId)
    expect(post).toEqual(fakePost)
  })
})
