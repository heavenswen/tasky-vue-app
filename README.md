# tasky-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### about

// 在package.json 中添加以下代码
```
"husky": {
  "hooks": {
      // 提交commit时触发
    "pre-commit": "lint-staged",
      // 检测commit的message时触发
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```
/**
// gitHooks（常用hooks）
1.pre-commit：钩子在键入提交信息前运行。
2.prepare-commit-msg：钩子在启动提交信息编辑器之前，默认信息被创建之后运行。
3.commit-msg：钩子接收一个参数，存有当前提交信息的临时文件的路径。 
              如果该钩子脚本以非零值退出，Git 将放弃提交，
              因此，可以用来在提交通过前验证项目状态或提交信息。
4.post-commit：钩子在整个提交过程完成后运行。
*/
