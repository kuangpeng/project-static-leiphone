var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev-append'),
    handlebars = require("gulp-handlebars"),
    wrap = require("gulp-wrap"),
    declare = require("gulp-declare"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename');

gulp.task('html-refresh', function() {
    gulp.src(['src/*.html'])
        .pipe(livereload());
});
gulp.task('css-refresh', function() {
    gulp.src(['src/css/*.*'])
        .pipe(livereload());
});
gulp.task('js-refresh', function() {
    gulp.src(['src/js/*.*'])
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('src/**/*.*', function (file) {
        livereload.changed(file.path);
    });
});

/**
 * 根据页面中 有 ‘?rev=@@hash’ 后缀的地方，正则匹配并以文件hash替换
 */
gulp.task('rev', function () {
    gulp.src('src/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/html'));
});

/**
 * handlebars 模版编译
 * namespace::  Student.templates.person(data); 修改Student.template 改变调用名称,person代表模版文件名称
 * 调用方式： 引入编译好的js文件
 *  var data = {
      id: '20160001',
    };
    var person = Student.templates.person(data);
    $("#container").html(person);
 *
 */
gulp.task("handlebars-preCompile", function(){
    var template_src = "src/js/templates/",
        pre_template_src = "src/js/pre-templates/";

    gulp.src(template_src+'*.handlebars')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Student.templates',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(pre_template_src))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(pre_template_src));
});