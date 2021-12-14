import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateInput } from '../inputs/user'
import { UserAuthenticationSchema } from '../schemas/user-authentication'
import { UserSchema } from '../schemas/user-schema'
import * as UserService from '../service/user'

@Resolver(() => UserSchema)
export class UserResolver {
  @Authorized('admin')
  @Query(() => [UserSchema])
  async users (): Promise<UserSchema[]> {
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
  ): Promise<UserSchema> {
    return await UserService.userCreate(fields)
  }
}
