import { Arg, Query, Resolver } from 'type-graphql'
import { UserSchema } from '../schemas/user-schema'
import { UserRole, UserStatus } from '../shared/enums'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => UserSchema)
  user (
    @Arg('name', { nullable: true }) name: string
  ): UserSchema {
    return { name: 'Rafael', email: 'rafael@mail.com', status: UserStatus.active, role: UserRole.admin, id: 'id' }
  }
}
