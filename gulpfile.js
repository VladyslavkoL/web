const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const less = require('gulp-less');
const browsersync = require('browser-sync').create();

// Clean dist

function clear() {
    return src('./dist/*', {
            read: false
        })
        .pipe(clean());
}

// JS функція

function js() {
    const source = './app/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./dist/js/'))
        .pipe(browsersync.stream());
}

function lessLoader() {
    const source = './app/less/*.less';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/less/'))
        .pipe(browsersync.stream());
}
// CSS функція

function css() {
    const source = './app/sass/*.sass';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/css/'))
        .pipe(browsersync.stream());
}

// Оптимізація img
function img() {
    return src('./app/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}
//  html
/*function html() {
    return src('*.html')
        .pipe(dest('./dist/h
        tml'));
}*/

// Перегляд зміни файлів



// BrowserSync

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000,
        notify: false
    });
    done();
}

function reload(done) {
    browsersync.reload();
    done();
}

function watchFiles(done) {
    watch('./app/sass/*', series(css, reload));
    watch('./app/js/*', series(js, reload));
    watch('./app/img/*', series(img, reload));
    watch('*.html', reload);
    watch('./app/less/*', series(lessLoader, reload))
    done();
}

// Cтворення тасків

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(parallel(js, css, img));
exports.clean = parallel(clear);