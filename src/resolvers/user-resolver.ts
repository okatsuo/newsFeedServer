import { PrismaClient } from '@prisma/client'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateInput } from '../inputs/user'
import { UserSchema } from '../schemas/user-schema'

@Resolver(() => UserSchema)
export class UserResolver {
  constructor (private readonly prisma_client = new PrismaClient()) {}

  @Query(() => [UserSchema])
  async user (): Promise<UserSchema[]> {
    return await this.prisma_client.user.findMany()
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields') fields: UserCreateInput
  ): Promise<UserSchema> {
    const newUser = await this.prisma_client.user.create({ data: fields })
    return newUser
  }
}
