import { IsEmail, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserCreateInput {
  @Field()
  name: string

  @IsEmail({}, { message: 'Por favor insira um email válido' })
  @Field()
  email: string

  @MinLength(3, { message: 'Por favor insira uma senha maior ou igual que 3 caracteres' })
  @Field()
  password: string
}
