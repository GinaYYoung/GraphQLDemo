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
`;
