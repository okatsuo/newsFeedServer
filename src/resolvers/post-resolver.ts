import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Post, User } from '@prisma/client'

import { PostSchema } from '../schemas/post-schema'
import { prismaClient } from '../shared/prisma'
import * as PostService from '../service/post'
import { PostCreateInput } from '../inputs'

@Resolver(() => PostSchema)
export class PostResolver {
  @FieldResolver()
  async user (@Root() post: Post): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { id: post.userId } })
  }

  @Authorized()
  @Query(() => [PostSchema])
  async posts (): Promise<Post[]> {
    return await PostService.posts()
  }

  @Authorized()
  @Mutation(() => PostSchema)
  async postCreate (
    @Arg('fields') fields: PostCreateInput
  ): Promise<Post> {
    return await PostService.postaCreate(fields)
  }
}
