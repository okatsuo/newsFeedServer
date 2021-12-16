import { registerEnumType } from 'type-graphql'

export enum UserRole {
  admin = 'admin',
  user= 'user'
}

registerEnumType(UserRole, {
  name: 'UserRole'
})
