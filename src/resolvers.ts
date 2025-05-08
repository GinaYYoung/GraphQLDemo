const users = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" }
  ]

export const resolvers = {
    Query: {
        users: async() => {
            return users;
          },
        user: async(_:undefined, args:any) => {
            const userId = args.id;
            return users.find(v => v.id === userId);
          }
    },
    Mutation: {
        createUser: async(_:undefined, args:any) => {
            const newUser = { id: String(users.length + 1), ...args };
            users.push(newUser);
            return newUser;
          },
        updateUser: async(_:undefined, args:any) => {
            const userId = args.id;
            const userIndex = users.findIndex(v => v.id === userId);
            if (userIndex !== -1) {
              users[userIndex] = { ...users[userIndex], ...args };
              return users[userIndex];
            }
            throw new Error("User not found");
          },
        deleteUser: async(_:undefined, args:any) => {
            const userId = args.id;
            const userIndex = users.findIndex(v => v.id === userId);
            if (userIndex !== -1) {
              const deletedUser = users[userIndex];
              users.splice(userIndex, 1);
              return deletedUser;
            }
            throw new Error("User not found");
          }
    }
  }