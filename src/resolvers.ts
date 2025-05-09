import { AppError, ErrorMessages } from './errors';

const users = [
    { id: "1", name: "Alice", email: "alice@example.com", friends: ["2"] },
    { id: "2", name: "Bob", email: "bob@example.com", friends: ["1"] },
    { id: "3", name: "Kelly", email: "Kelly@example.com", friends: ["1", "2"] }
]

export const resolvers = {
    Query: {
        users: async () => {
            return users;
        },
        user: async (_: undefined, args: any) => {
            try {
                const userId = args.id;
                const user = users.find(v => v.id === userId);
                if (!user) {
                    throw new AppError(
                        ErrorMessages.USER_NOT_FOUND,
                        404
                    );
                }
                return user;
            } catch (error) {
                throw new AppError(
                    ErrorMessages.INTERNAL_SERVER_ERROR,
                    500
                );
            }
        },
    },
    User: {
        friends: (parent: any) => {
            try {
                const user = parent;
                const friends = [];

                for (let i = 0; i < user.friends.length; i++) {
                    const friend = users.find((u) => u.id === user.friends[i])
                    if (friend) {
                        friends.push(friend);
                    } else {
                        friends.push(null)
                    }
                }
                return friends;
            } catch (error) {
                throw new AppError(
                    ErrorMessages.INTERNAL_SERVER_ERROR,
                    500
                );
            }
        }
    },
    Mutation: {
        createUser: async (_: undefined, args: any) => {
            try {
                const newUser = { id: String(users.length + 1), ...args.userInput };
                users.push(newUser);
                const userFriends = args.userInput.friends;
                for (let i = 0; i < userFriends.length; i++) {
                    const friend = users.find(v => v.id === userFriends[i]);
                    if (friend && friend.id === newUser.id) {
                        throw new AppError(
                            ErrorMessages.INVALID_FRIEND,
                            400
                        );
                    }
                    if (friend) {
                        friend.friends.push(newUser.id);
                    }
                }
                return newUser;
            } catch (error) {
                throw new AppError(
                    ErrorMessages.INTERNAL_SERVER_ERROR,
                    500
                );
            }
        },
        updateUser: async (_: undefined, args: any) => {
            try {
                const userId = args.userInput.id;
                const userFriends = args.userInput.friends;
                const userIndex = users.findIndex(v => v.id === userId);

                if (userIndex === -1) {
                    throw new AppError(
                        ErrorMessages.USER_NOT_FOUND,
                        404
                    );
                }

                for (let i = 0; i < userFriends.length; i++) {
                    const friend = users.find(v => v.id === userFriends[i]);
                    if (friend && friend.id === userId) {
                        throw new AppError(
                            ErrorMessages.INVALID_FRIEND,
                            400
                        );
                    }
                    if (!friend) {
                        throw new AppError(
                            ErrorMessages.FRIEND_NOT_FOUND,
                            404
                        );
                    }
                }

                users[userIndex] = { ...users[userIndex], ...args.userInput };
                return users[userIndex];
            } catch (error) {
                throw new AppError(
                    ErrorMessages.INTERNAL_SERVER_ERROR,
                    500
                );
            }
        },
        deleteUser: async (_: undefined, args: any) => {
            try {
                const userId = args.id;
                const userIndex = users.findIndex(v => v.id === userId);

                if (userIndex === -1) {
                    throw new AppError(
                        ErrorMessages.USER_NOT_FOUND,
                        404
                    );
                }

                const deletedUser = users[userIndex];
                users.splice(userIndex, 1);
                for (let i = 0; i < users.length; i++) {
                    users[i].friends = users[i].friends.filter(v => v !== userId);
                }
                return deletedUser;
            } catch (error) {
                throw new AppError(
                    ErrorMessages.INTERNAL_SERVER_ERROR,
                    500
                );
            }
        }
    }
}