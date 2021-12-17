import { Post, PrismaClient, User } from '@prisma/client'
import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { UserCreateInput } from '../inputs/user'
import { UserAuthenticationSchema } from '../schemas/user-authentication'
import { UserSchema } from '../schemas/user-schema'
import * as UserService from '../service/user'

@Resolver(() => UserSchema)
export class UserResolver {
  prisma = new PrismaClient()

  @FieldResolver()
  async posts (@Root() user: User): Promise<Post[]> {
    return await this.prisma.post.findMany({ where: { userId: user.id } })
  }

  @Query(() => UserSchema, { nullable: true })
  async user (
    @Arg('id') id: string
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  @Authorized('admin')
  @Query(() => [UserSchema])
  async users (): Promise<User[]> {
    return await UserService.users()
  }

  @Query(() => UserAuthenticationSchema)
  async login (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<UserAuthenticationSchema> {
    return await UserService.UserAuthentication(email, password)
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields') fields: UserCreateInput
  ): Promise<User> {
    return await UserService.userCreate(fields)
  }
}
