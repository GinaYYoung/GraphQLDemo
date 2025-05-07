type Query {
    users:[User!]!
    user(id: ID!): User
}


type User {
    id:String
    name:String
    email:String
}
