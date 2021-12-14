import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateInput } from '../inputs/user'
import { UserSchema } from '../schemas/user-schema'
import * as UserService from '../service/user'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async users (): Promise<UserSchema[]> {
    return await UserService.usersService()
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields') fields: UserCreateInput
  ): Promise<UserSchema> {
    return await UserService.userCreate(fields)
  }
}
