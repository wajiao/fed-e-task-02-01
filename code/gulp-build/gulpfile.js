// 
const { src, dest, parallel, series,watch } = require('gulp')

const del = require('del')

const browserSync = require('browser-sync')
// 引入插件模块
const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()
// const sass = require('gulp-sass') //sass->css文件转换
// const babel = require('gulp-babel') //@babel/core核心文件 ，@babel/preset-env es6特性转换文件
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

// 清除文件内容
const clean = () => {
    return del(['dist'])
}

// 样式编译
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' })) //
        .pipe(dest('dist'))
}
// 脚本编译
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))//babel,@babel/core,@babel/preset-env
        .pipe(dest('dist'))
}
// 模版编译
const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig()) 
        .pipe(dest('dist'))
}
// 图片压缩
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin()) //imagemin
        .pipe(dest('dist'))
}
// 字体压缩
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
// extra
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}
// serve 
const serve = ()=>{
    // 监视文件触发任务,覆盖dist文件
    watch('src/assets/styles/*.scss',style)
    watch('src/assets/scripts/*.js',script)
    watch('src/*.html',page)
    // watch('src/assets/images/**',image)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)

    // 构建优化
    watch(['src/assets/images/**','src/assets/fonts/**','public/**'],bs.reload)
    bs.init({
        server:{
            baseDir:['dist','src','public'],
            routes:{
                '/node_modules':'node_modules'
            },
            files:'dist/**'//监听的文件
        }
    })
}
// useref
const useref = ()=>{
    return src('dist/*.html',{base:'dist'})
        .pipe(plugins.useref({searchPath:['dist','.']}))
        //压缩html js css
        .pipe(plugins.if(/\.js$/,plugins.uglify()))
        .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/,plugins.htmlmin({
            collapseWhitespace:true,
            minifyCss:true,
            minifyJs:true
        })))
        .pipe(dest('dist'))
}

// 组合任务 
const compile = parallel(style, script, page)

// develop 
const develop = series(compile,serve)
// build 
const build = series(clean, parallel(compile, extra, image, font))

module.exports = {
    develop,
    build,
    clean,
    useref
}
