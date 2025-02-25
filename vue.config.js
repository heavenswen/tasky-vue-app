module.exports = { // 多页面打包
    publicPath: './',
    // 编译时的eslint提示处理
    lintOnSave: process.env.NODE_ENV !== 'production',
    pages: {
        main: {
            // page 的入口
            entry: 'src/modules/main/main.js',
            // 模板来源
            template: 'public/main.html',
            // 在 dist/index.html 的输出
            filename: 'main.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Main Page'
        },
        remind: {
            entry: 'src/modules/remind/remind.js',
            template: 'public/remind.html',
            filename: 'remind.html',
            title: 'Remind Page'
        }
    },
    devServer: {
        // 代理配置
        proxy: {
            '/api': {
                // 的请求会将请求代理到
                target: 'http://yapi.heisea.cn/mock/159'
                // 如果不希望传递/api，则需要重写路径
                // pathRewrite: { '^/api': '' },
            }
        }
    }
};
