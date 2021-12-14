import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateInput } from '../inputs/user'
import { UserAuthenticationSchema } from '../schemas/user-authentication'
import { UserSchema } from '../schemas/user-schema'
import * as UserService from '../service/user'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async users (): Promise<UserSchema[]> {
    return await UserService.usersService()
  }

  @Query(user => UserAuthenticationSchema)
  async login (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<UserAuthenticationSchema> {
    return await UserService.UserAuthenticationService(email, password)
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields') fields: UserCreateInput
  ): Promise<UserSchema> {
    return await UserService.userCreate(fields)
  }
}
