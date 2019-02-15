var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-vendor',function(){
    gulp.src('src/js/vendor/vendor.js')
      .pipe(sourcemaps.init())
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('app/assets/js'))
      .pipe(uglify())
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/assets/js/vendor'))
      .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});
