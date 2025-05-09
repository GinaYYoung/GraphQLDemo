export const typeDefs = `
type Query {
    users: [User!]!
    user(id: String): User
}

type User {
    id: ID!
    name: String
    email: String
    friends: [User]
}

type Mutation {
    createUser(userInput: UserInput): User
    updateUser(userInput: UserInput): User
    deleteUser(id: String): User
}

input UserInput {
    id: String
    name: String!
    email: String!
    friends: [String]
}
`;
