export const typeDefs = `
type Query {
    users: [User!]!
    user(id: String): User
    friends(id: String): [User]
}

type User {
    id: ID!
    name: String
    email: String
    friends: [User]
}

type Mutation {
    createUser(name: String, email: String,friends: [String]): User
    updateUser(id: String, name: String, email: String,friends: [String]): User
    deleteUser(id: String): User
}
`;
