import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { Field, InputType } from 'type-graphql'

@InputType()
export class PostCreateInput {
  @Field()
  text: string

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<FileUpload>

  @Field()
  userId: string
}
