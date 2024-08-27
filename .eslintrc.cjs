module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'next',
        'next/core-web-vitals',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'next-env.d.ts'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'react',
        'react-hooks',
        'prettier',
        'no-comments',
        'simple-import-sort',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
        'no-console': ['error', { allow: ['error'] }],
        'no-comments/disallowComments': [
            'error',
            {
                allow: ['TODO', 'FIXME', 'NOTE', 'DEBUG'],
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^@?\\w'],
                    ['^(@|components)(/.*|$)'],
                    ['^\\u0000'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ['^.+\\.?(css)$'],
                ],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        React: 'readonly',
    },
};
