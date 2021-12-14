import { Field, InputType } from 'type-graphql'

@InputType()
export class PostCreateInput {
  @Field()
  text: string

  @Field()
  userId: string
}
