import { User } from '@prisma/client'
import { Field, ObjectType } from 'type-graphql'
import { UserSchema } from './user-schema'

@ObjectType()
export class UserAuthenticationSchema {
  @Field()
  token: string

  @Field(() => UserSchema)
  user: User
}
