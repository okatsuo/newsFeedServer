import { registerEnumType } from 'type-graphql'

export enum UserStatus {
  active = 'active',
  disabled = 'disabled',
  banned ='banned',
}

registerEnumType(UserStatus, {
  name: 'UserStatus'
})
