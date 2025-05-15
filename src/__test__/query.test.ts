import { resolvers } from '../resolvers';
import { AppError } from '../errors';
import { User } from '../gql/types';

describe('GraphQL Queries', () => {
    describe('users query', () => {
        it('should return all users', async () => {
            const result = await (resolvers.Query as any).users();
            expect(result).toHaveLength(3);
            expect(result[0]).toHaveProperty('id', '1');
            expect(result[0]).toHaveProperty('name', 'Alice');
            expect(result[0]).toHaveProperty('email', 'alice@example.com');
        });
    });

    describe('user query', () => {
        it('should return a specific user by id', async () => {
            const result = await (resolvers.Query as any).user(undefined, { id: '1' });
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Alice');
            expect(result).toHaveProperty('email', 'alice@example.com');
        });

        it('should throw error when user not found', async () => {
            await expect(
                (resolvers.Query as any).user(undefined, { id: '99' })
            ).rejects.toThrow(AppError);
        });
    });

    describe('User friends field', () => {
        it('should return friends for a user', async () => {
            const user = await (resolvers.Query as any).user(undefined, { id: '1' });
            const friends = await (resolvers.User as any).friends(user);
            expect(friends).toHaveLength(2);
            expect(friends[0]).toHaveProperty('id', '2');
            expect(friends[1]).toHaveProperty('id', '3');
        });

        it('should return empty array for user with no friends', async () => {
            const user = await (resolvers.Query as any).user(undefined, { id: '2' });
            const friends = await (resolvers.User as any).friends(user);
            expect(friends).toHaveLength(1);
            expect(friends[0]).toHaveProperty('id', '1');
        });
    });
});
