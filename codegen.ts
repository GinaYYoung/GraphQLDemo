import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'src/schema.ts',
    generates: {
        './src/gql/types.ts': {
            plugins: ['typescript'],
            config: {
                enumsAsTypes: true,
                scalars: {
                    ID: 'string',
                },
            },
        }
    }
}

export default config