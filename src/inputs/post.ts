import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { Field, InputType } from 'type-graphql'

@InputType()
class PostCreateInputBase {
  @Field()
  text: string

  @Field()
  userId: string
}

@InputType()
export class PostCreateInput extends PostCreateInputBase {
  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<FileUpload>
}
@InputType()
export class PostCreateInputWithImageUrl extends PostCreateInputBase {
  @Field({ nullable: true })
  imageUrl?: string
}
