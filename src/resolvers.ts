const users = [
    { id: "1", name: "Alice", email: "alice@example.com",friends:["2"] },
    { id: "2", name: "Bob", email: "bob@example.com",friends:["1"] },
    { id: "3", name: "Kelly", email: "Kelly@example.com",friends:["1","2"] }

  ]

export const resolvers = {
    Query: {
        users: async() => {
            return users;
          },
        user: async(_:undefined, args:any) => {
            const userId = args.id;
            return users.find(v => v.id === userId);
          },
    },
    User: {  
      friends: (parent: any) => {
        const user = parent;
        const friends = [];
        const friendsMap = new Map(user.friends.map((id: string) => [id, true]));
        for (let i = 0; i < users.length; i++) {
          if (friendsMap.has(users[i].id)) {
            friends.push(users[i]);
          }
        }
        return friends;
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