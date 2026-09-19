const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function html() {
    return src('src/app/index.html')
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('src/app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src('src/app/js/main.js')
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/app/imgs/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/imgs'))
        .pipe(browserSync.stream());
}

function server() {
    browserSync.init({
        server: { baseDir: './dist' }
    });
    watch('src/app/index.html', html).on('change', browserSync.reload);
    watch('src/app/scss//*.scss', styles);
    watch('src/app/js//.js', scripts);
    watch('src/app/imgs/**/', images);
    watch('dist/**/*').on('change', browserSync.reload);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.default = series(parallel(html, styles, scripts, images), server);