import { Post } from '@prisma/client'
import { Field, ObjectType } from 'type-graphql'
import { UserRole, UserStatus } from '../shared/enum'
import { PostSchema } from './post-schema'

@ObjectType()
export class UserSchema {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field(() => UserStatus)
  status: UserStatus

  @Field()
  role: UserRole

  @Field(() => [PostSchema])
  posts: Post[]

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
