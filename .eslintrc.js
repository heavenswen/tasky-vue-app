// https://eslint.org/docs/user-guide/configuring

module.exports = {
    // 为true根配置文件，否则会按照目录树向上搜索
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
        browser: true,
        "node": true

    },
    "extends": [
        "plugin:vue/vue3-essential",
        "@vue/standard"
    ],
    // required to lint *.vue files
    plugins: ['vue'],
    settings: {
    },
    // 自定义校验规则
    rules: {
        // eslint-plugin-import插件提供的能力
        // 'import/extensions': [
        //     'error',
        //     'always',
        //     // 是否取消后缀
        //     // {
        //     //     js: 'never',
        //     //     vue: 'never',
        //     //     css: 'never',
        //     //     less: 'never'
        //     // }
        // ],
        'no-param-reassign': 'off',
        // 允许在开发环境添加debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 允许使用嵌套的三目
        'no-nested-ternary': 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        // 末尾分号
        semi: 'off',
        // 逗号
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
        // 'linebreak-style': [0, 'error', 'windows']
    }
};
