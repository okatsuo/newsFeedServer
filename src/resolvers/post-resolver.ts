import { Post, User } from '@prisma/client'
import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { PostCreateInput } from '../inputs'
import { PostSchema } from '../schemas/post-schema'
import { prismaClient } from '../shared/prisma'
import { uploadFile } from '../shared/upload-file'

@Resolver(() => PostSchema)
export class PostResolver {
  @FieldResolver()
  async user (@Root() post: Post): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { id: post.userId } })
  }

  @Authorized()
  @Query(() => [PostSchema])
  async posts (): Promise<Post[]> {
    return await prismaClient.post.findMany()
  }

  @Authorized()
  @Mutation(() => PostSchema)
  async postCreate (
    @Arg('fields') fields: PostCreateInput
  ): Promise<Post> {
    const { image, ...postFields } = fields
    const imageUrl = image ? await uploadFile('postImage', image) as string : undefined
    return await prismaClient.post.create({ data: { ...postFields, imageUrl } })
  }
}
