// 1.核心文件
const Generator = require('yeoman-generator') 
module.exports = class extends Generator { //继承Generator
  prompting () { // 3.命令行交互的方法
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ])
    .then(answers => {
      this.answers = answers //获取交互信息
    })
  }

  writing () { 
    const templates = [
      'public/favicon.ico',
      'public/index.html',

      'src/App.vue',
      'src/main.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',

      '.gitignore',
      'babel.config.js',
      'package.json',
      'README.md'
    ]

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item), //模版地址
        this.destinationPath(item), //目标地址
        this.answers //交互信息
      )
    })
  }
}