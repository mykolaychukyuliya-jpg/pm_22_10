const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

function html() {
    return src('src/app/index.html')
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
}

function styles() {
    return src('src/app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(rename('index.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src('src/app/js/main.js')
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function copyBootstrapCss() {
    return src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css'));
}

function copyBootstrapJs() {
    return src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(dest('dist/js'));
}

function images() {
    return src('src/app/imgs/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('dist/imgs'))
        .pipe(browserSync.stream());
}

function server() {
    browserSync.init({
        server: { baseDir: './dist' }
    });
    watch('src/app/index.html', html);
    watch('src/app/components/**/*.html', html);
    watch('src/app/scss/**/*.scss', styles);
    watch('src/app/js/**/*.js', scripts);
    watch('src/app/imgs/**/*', images);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.copyBootstrapCss = copyBootstrapCss;
exports.copyBootstrapJs = copyBootstrapJs;
exports.default = series(
    parallel(html, styles, scripts, images, copyBootstrapCss, copyBootstrapJs),
    server
);