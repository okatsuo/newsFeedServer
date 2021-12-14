import { Field, ObjectType } from 'type-graphql'
import { UserSchema } from './user-schema'

@ObjectType()
export class PostSchema {
  @Field()
  id: string

  @Field()
  text: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date

  @Field(() => UserSchema)
  user: UserSchema
}
