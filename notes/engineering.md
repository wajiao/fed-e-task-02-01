
## 工程化

### 工程化定义和主要解决的问题

工程化解决的问题：  
1. 传统语言或语法的弊端
2. 无法使用模块化／组件化
3. 重复的机械式工作
4. 代码风格统一、质量保证
5. 依赖后端服务接口支持
6. 整体依赖后端项目

项目创建： 创建项目结构; 创建特定类型文件  
编码： 格式化代码; 校验代码风格; 编译／构建。打包  
预览（测试）： web Server/Mock; Live Reloading/HMR; Source Map  
提交： Git Hooks; Lint-staged; 持续集成   
部署： CI/CD; 自动发布;

### 脚手架
脚手架本质作用：创建项目基础结构、提供项目规范和约定（相同的组织结构、开发范式、模块依赖、工具配置、基础代码）

#### yeomen
1. yarn add yeomen -global
2. yarn add generator-node

### gulp构建原理
```
const fs =require('fs')
const {Transform} = require('stream')
exports.default = ()=>{
    // 文件读取流
     const read = fs.createReadStream('normalize.css')
    // 文件转换流
     const transform = new Transform({
         transform:(chunk,encoding,callback)=>{
             // 核心转换过程实现
             //chunk => 读取流中读取到的内容（buffer）
             const input = chunk.toString()
             const output=input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')
             callback(null,output)
         }
     })
     // 文件写入流
     const write = fs.createWriteStream('normalize.min.css')
    
     read.pipe(transform).pipe(write)
     return read
 }
```





