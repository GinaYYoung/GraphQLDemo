export const typeDefs = `
type Query {
    users: [User!]!
    user(id: String): User
}

type User {
    id: String
    name: String
    email: String
}

type Mutation {
    createUser(name: String, email: String): User
    updateUser(id: String, name: String, email: String): User
    deleteUser(id: String): User
}
`;
