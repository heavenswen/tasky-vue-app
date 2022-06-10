// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    // 采用vue提供的解析器
    parser: 'vue-eslint-parser',
    // 同时存在的解析器
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2020
    },
    env: {
        browser: true
     
    },
    extends: ['airbnb-base', 'plugin:vue/recommended'],
    // required to lint *.vue files
    plugins: ['vue'],
    settings: {
        // 解析import的资源路径，比如alias
        'import/resolver': {
            webpack: {
                config: './build/webpack.base.js'
            }
        }
    },
    // 自定义校验规则
    rules: {
        // eslint-plugin-import插件提供的能力
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never',
                css: 'never',
                less: 'never'
            }
        ],
        'no-param-reassign': 'off',
        // 允许在开发环境添加debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 允许使用嵌套的三目
        'no-nested-ternary': 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'global-require': 'off',
        'no-trailing-spaces': 'off',
        'eol-last': 'off',
        'max-len': ['error', { code: 500 }],
        'arrow-parens': ['error', 'as-needed'],
        'operator-linebreak': ['error', 'after'],
        'object-curly-newline': 'off',
        'vue/script-indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/require-component-is': 'off',
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never'
            }
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: true
                }
            }
        ]
        // 'linebreak-style': [0, 'error', 'windows']
    }
};
