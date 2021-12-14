import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserSchema {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  status: string

  @Field()
  role: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
