import { resolvers } from '../resolvers';
import { AppError } from '../errors';

describe('GraphQL Mutations', () => {
    describe('createUser mutation', () => {
        it('should create a new user successfully', async () => {
            const userInput = {
                name: 'New User',
                email: 'newuser@example.com',
                friends: []
            };

            const result = await (resolvers.Mutation as any).createUser(undefined, { userInput });

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name', 'New User');
            expect(result).toHaveProperty('email', 'newuser@example.com');
        });

        it('should throw error when trying to add self as friend', async () => {
            const userInput = {
                name: 'New User',
                email: 'newuser@example.com',
                friends: [{ id: '1' }]
            };

            await expect(
                (resolvers.Mutation as any).updateUser(undefined, { userInput })
            ).rejects.toThrow(AppError);
        });
    });

    describe('updateUser mutation', () => {
        it('should update user successfully', async () => {
            const userInput = {
                id: '1',
                name: 'Updated Alice',
                email: 'updated.alice@example.com',
                friends: []
            };

            const result = await (resolvers.Mutation as any).updateUser(undefined, { userInput });

            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Updated Alice');
            expect(result).toHaveProperty('email', 'updated.alice@example.com');
        });

        it('should throw error when updating non-existent user', async () => {
            const userInput = {
                id: '99',
                name: 'Non Existent',
                email: 'nonexistent@example.com',
                friends: []
            };

            await expect(
                (resolvers.Mutation as any).updateUser(undefined, { userInput })
            ).rejects.toThrow(AppError);
        });
    });

    describe('deleteUser mutation', () => {
        it('should delete user successfully', async () => {
            const result = await (resolvers.Mutation as any).deleteUser(undefined, { id: '1' });

            expect(result).toHaveProperty('id', '1');

            // Verify user is actually deleted
            await expect(
                (resolvers.Query as any).user(undefined, { id: '1' })
            ).rejects.toThrow(AppError);
        });

        it('should throw error when deleting non-existent user', async () => {
            await expect(
                (resolvers.Mutation as any).deleteUser(undefined, { id: '999' })
            ).rejects.toThrow(AppError);
        });
    });
}); 