import 'reflect-metadata'
import { Arg, buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

@ObjectType()
class UserSchema {
  @Field()
  name: string
}

@Resolver(() => UserSchema)
class UserResolver {
  @Query(() => UserSchema)
  user (
    @Arg('name', { nullable: true }) name: string
  ): UserSchema {
    return { name: name || 'Rafael' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function main () {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen(5544)
  console.log(`server running at ${url}`)
})()
