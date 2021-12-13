import { Field, ObjectType } from 'type-graphql'
import { UserRole, UserStatus } from '../shared/enums'

@ObjectType()
export class UserSchema {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  status: UserStatus

  @Field()
  role: UserRole
}
