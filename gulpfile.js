'use strict'
const gulp = require('gulp')
const del = require('del')
const fileinclude = require('gulp-file-include')
const browserSync = require('browser-sync').create()
const path = require('path')

const resolve = function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const scriptsPath = {
  src: resolve('./src/scripts/**/*.js'),
  dist: resolve('./dist/scripts')
}

const stylesPath = {
  src: resolve('./src/styles/**/*.css'),
  dist: resolve('./dist/styles')
}

const staticPath = {
  src: resolve('./src/static/**/*'),
  dist: resolve('./dist/static')
}

// 清除 dist 文件夹
gulp.task('clean', function() {
  return del.sync('./dist')
})

// html 整合
gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'))
})

// js
gulp.task('scripts', () => {
  gulp.src(scriptsPath.src).pipe(gulp.dest(scriptsPath.dist))
})

// style
gulp.task('styles', () => {
  gulp.src(stylesPath.src).pipe(gulp.dest(stylesPath.dist))
})

// static
gulp.task('static', () => {
  gulp.src(staticPath.src).pipe(gulp.dest(staticPath.dist))
})

// 配置服务器
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 8000
  })
  // 监听 html
  gulp.watch('./src/**/*', ['html', 'scripts', 'static', 'styles']).on('change', browserSync.reload)
})

gulp.task('default', ['clean', 'html', 'serve', 'scripts', 'styles', 'static'])
