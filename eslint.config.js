import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import boundaries from 'eslint-plugin-boundaries'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),

    // ===============================
    // APP (React + TS)
    // ===============================
    {
        files: ['src/**/*.{ts,tsx}'],

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            react.configs.flat.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            prettier,
        ],

        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
            parserOptions: {
                project: './tsconfig.app.json',
            },
        },

        // ❗ НЕ регистрируем import повторно
        plugins: {
            boundaries,
        },

        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json',
                },
            },
            'boundaries/elements': [
                { type: 'app', pattern: 'src/app/**' },
                { type: 'pages', pattern: 'src/pages/**' },
                { type: 'processes', pattern: 'src/processes/**' },
                { type: 'features', pattern: 'src/features/**' },
                { type: 'entities', pattern: 'src/entities/**' },
                { type: 'shared', pattern: 'src/shared/**' },
            ],
        },

        rules: {
            // React 17+ JSX runtime
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            // TypeScript строгость
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error'],

            // Порядок импортов
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                    ],
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                    ],
                    alphabetize: { order: 'asc' },
                    'newlines-between': 'always',
                },
            ],

            // Boundaries (пока мягкий режим)
            'boundaries/element-types': [
                'error',
                {
                    default: 'allow',
                },
            ],
        },
    },

    // ===============================
    // NODE (vite config)
    // ===============================
    {
        files: ['vite.config.ts'],

        languageOptions: {
            parserOptions: {
                project: './tsconfig.node.json',
            },
            globals: globals.node,
        },
    },
])
