const gulp = require('gulp');// 引入gulp等模块
const htmlmin = require('gulp-htmlmin');
const minCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');
// 压缩css js html
gulp.task('minifycss', () => {
    gulp.src('./myApp/static/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./static/zip'));
});
gulp.task('minifyjs', () => {
    gulp.src('./myApp/static/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./static/zip'));
});
gulp.task('minifyhtml', () => {
    gulp.src('./myApp/static/html/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./static/zip'));
});
gulp.task('webserver', () => { // 启动服务器
    webserver({
        host: 'localhost',
        port: 8060
    });
});
gulp.task('bkdata', () => { // 响应页面
    webserver({
        host: 'localhost',
        port: 8070,
        middleware: (request, response, next) => {
            if (request.url === '/list') {
                response.writeHead(200, {
                    'content-type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                var data = {
                    'fir': {'img': './myApp/static/images/logo.png', 'title': '手机', 'intro': '互联网已上市'},
                    'sec': {'img': './myApp/static/images/logo.png', 'title': '手机', 'intro': '互联网已上市'},
                    'thr': {'img': './myApp/static/images/logo.png', 'title': '手机', 'intro': '互联网已上市'}
                };
                response.end(JSON.stringify(data));// 响应值
            } else {
                console.log('error');
            }
        }
    });
});
gulp.task('default', () => { // 自动执行的任务
    gulp.start('minifycss', 'minifyjs', 'minifyhtml', 'webserver', 'bkdata');
});
