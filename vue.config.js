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
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                "appId": "electron-demo.appid.1231321",
                "productName": "electron-demo",
                "copyright": "Copyright © 2021 geeboo",
                "directories": {
                    // "buildResources": "dist",  //指定打包需要的静态资源，默认是build
                    "output": "dist",  //打包生成的目录，默认是dist
                },
                // 更新模块
                "publish": [
                    {
                       "provider": "generic",
                       "url": "http://127.0.0.1:9005/" 
                    }
                  ],
                // "publish": ['github'],
                // mac
                "mac": {
                    // //应用程序安装到哪个分类下，具体有哪些分类可以在苹果官网上找
                    // "category": "public.app-category.utilities"
                    "icon": "public/icon/icon.icns" //安装时图标
                },
                "dmg": {
                    "background": "./public/img/background_1.jfif",
                    "icon": "public/icon/icon.icns", // 在桌面的图标
                    "iconSize": 100,
                    "contents": [
                        {
                            "x": 380,
                            "y": 180,
                            "type": "link",
                            "path": "/Applications"
                        },
                        {
                            "x": 130,
                            "y": 180,
                            "type": "file"
                        }
                    ],
                    "window": {
                        "width": 540,
                        "height": 380
                    }
                },
                // window
                "win": {
                    "target": [
                        "msi",
                        "nsis"
                    ],
                    "icon": "./public/icon/icon.icns"
                },
                "nsis": {
                    "perMachine": true, // 为当前系统的所有用户安装该应用程序
                    "oneClick": false, // 是否一键安装
                    "language": "2052", //安装语言，2052对应中文
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./public/icon/icon.ico",// 安装图标
                    "uninstallerIcon": "./public/icon/uninst.ico",//卸载图标
                    "installerHeaderIcon": "./public/icon/icon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "electron-demo-icon", // 图标名称
                    // "include": "build/script/installer.nsh", // 包含的自定义nsis脚本
                  },
            }
        }
    }

};
