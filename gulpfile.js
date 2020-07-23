var gulp = require("gulp");

const javascriptObfuscator = require('gulp-javascript-obfuscator');
var sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    imagemin = require('gulp-imagemin'),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    watch = require('gulp-watch');



// bootstrap
gulp.task('bootstrap', function() {
    return gulp.src(['dev/bootstrap/custom.scss'])
        .pipe(sass())
        .pipe(rename("bootstrap.css"))
        .pipe(gulp.dest("./build/css"));
});
/*gulp.task('bootstrap_js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("./build/js"));
});*/
// end bootstrap

gulp.task("sass", function() {
    return gulp.src("./dev/scss/index.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename("template_styles.css"))
        .pipe(gulp.dest("./build/css"));
});

gulp.task('img', function() {
    return gulp.src("./dev/img/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("./build/img"))
});

gulp.task('svg', function() {
    return gulp.src("./dev/img/*.svg")
        .pipe(gulp.dest("./build/img"))
});

gulp.task("scripts", function() {
    return gulp.src("./dev/js/**/*.js")
        .pipe(concat('scripts.js'))
        .pipe(javascriptObfuscator({
            compact: true,
            deadCodeInjection: true,
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./build/js"));
});

gulp.task('watch', function() {
    gulp.watch('./dev/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./dev/img/**/*.+(jpg|jpeg|png|gif)', gulp.series('img'));
    gulp.watch('./dev/img/**/*.svg', gulp.series('svg'));
    gulp.watch('./dev/js/**/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.series("bootstrap", "sass", "svg", "img", "scripts", "watch"));