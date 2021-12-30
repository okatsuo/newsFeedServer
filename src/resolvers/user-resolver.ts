import { Post, User } from '@prisma/client'
import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { UserCreateInput, UserUpdateInput } from '../inputs/user'
import { UserAuthenticationSchema } from '../schemas/user-authentication'
import { UserSchema } from '../schemas/user-schema'
import * as UserService from '../service/user'

@Resolver(() => UserSchema)
export class UserResolver {
  @FieldResolver()
  async posts (@Root() user: User): Promise<Post[]> {
    return await UserService.userPosts({ userId: user.id })
  }

  @Authorized()
  @Query(() => UserSchema, { nullable: true })
  async userProfile (
    @Arg('userToken') userToken: string
  ): Promise<User | null> {
    return await UserService.userProfile(userToken)
  }

  @Authorized()
  @Query(() => UserSchema, { nullable: true })
  async user (
    @Arg('id') id: string
  ): Promise<User | null> {
    return await UserService.user(id)
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

  @Authorized()
  @Mutation(() => UserSchema)
  async userUpdate (
    @Arg('userId') userId: string,
      @Arg('fields') fields: UserUpdateInput
  ): Promise<User> {
    return await UserService.userUpdate(userId, fields)
  }
}
