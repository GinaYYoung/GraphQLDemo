import { AppError, ErrorMessages } from './errors';
import {
    Query,
    Mutation,
    User,
    CreateUserInput,
    UpdateUserInput
} from './gql/types';

const users: User[] = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
    { id: "3", name: "Kelly", email: "Kelly@example.com" }
];

users[0].friends = [users[1], users[2]];
users[1].friends = [users[0]];
users[2].friends = [users[0]];

export const resolvers = {
    Query: {
        users: async () => {
            return users;
        },
        user: async (_: undefined, args: { id: string; }) => {
            const userId = args.id;
            const user = users.find(v => v.id === userId);
            if (!user) {
                throw new AppError(
                    ErrorMessages.USER_NOT_FOUND,
                    404
                );
            }
            return user;
        },
    } as unknown as Query,
    User: {
        friends: (parent: User) => {
            const friends: (User | null)[] = [];
            if (parent.friends) {
                for (let i = 0; i < parent.friends.length || 0; i++) {
                    const friend = users.find((u) => {
                        if (parent.friends) {
                            return u.id === parent.friends[i]?.id
                        }
                    })
                    if (friend) {
                        friends.push(friend);
                    } else {
                        friends.push(null)
                    }
                }
            }
            return friends;
        }
    } as unknown as User,
    Mutation: {
        createUser: async (_: undefined, args: { userInput: CreateUserInput }) => {
            const newUser: User = {
                id: String(users.length + 1),
                ...args.userInput
            };
            users.push(newUser);
            const userFriends = args.userInput.friends || [];
            for (let i = 0; i < userFriends.length; i++) {
                console.log(userFriends[i])
                const friend = users.find(v => v.id === userFriends[i]?.id);
                if (friend && friend.id === newUser.id) {
                    throw new AppError(
                        ErrorMessages.INVALID_FRIEND,
                        400
                    );
                }
                if (friend && friend.friends) {
                    friend.friends.push(newUser);
                }
            }
            return newUser;
        },
        updateUser: async (_: undefined, args: { userInput: UpdateUserInput }) => {
            const userId = args.userInput.id;
            const userFriends = args.userInput.friends || [];
            const userIndex = users.findIndex(v => v.id === userId);

            if (userIndex === -1) {
                throw new AppError(
                    ErrorMessages.USER_NOT_FOUND,
                    404
                );
            }

            for (let i = 0; i < userFriends.length; i++) {
                const friend = users.find(v => v.id === userFriends[i]?.id);
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
        },
        deleteUser: async (_: undefined, args: { id: string }) => {
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
                users[i].friends = users[i].friends?.filter(v => v?.id !== userId);
            }
            return deletedUser;
        }
    } as unknown as Mutation,
};