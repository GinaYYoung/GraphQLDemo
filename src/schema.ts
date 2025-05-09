export const typeDefs = /* GraphQL */ `
type Query {
    users: [User!]!
    user(id: String): User
}

type Mutation {
    createUser(userInput: CreateUserInput): User
    updateUser(userInput: UpdateUserInput): User
    deleteUser(id: String): User
}

type User {
    id: ID!
    name: String
    email: String
    friends: [User]
}

input CreateUserInput {
    name: String!
    email: String!
    friends: [inputFriend]
}

input UpdateUserInput {
    id: String!
    name: String!
    email: String!
    friends: [inputFriend]
}

input inputFriend {
    id: String!
}


`;
