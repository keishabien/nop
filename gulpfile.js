'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');

const pipeConcat = require('pipe-concat');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

// paths
const sassFiles = 'assets/scss/*.scss',
    jsFiles = 'assets/js/*.js',
    phpFiles = './*.php',
    mainDest = './';


//Creating task of detecting errors
gulp.task('detecterror', function () {
    return gulp
        .src(['assets/js/*.js'])
        .pipe(jshint())
        .pipe(jscs({configPath: '.jscsrc'}))
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});


gulp.task('styles', function () {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(mainDest))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jscs({configPath: '.jscsrc'}))
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(mainDest))
        .pipe(browserSync.stream());
});

gulp.task('clean-css', () => {
    return del([
        'style.css'
    ]);
});

gulp.task('clean-js', () => {
    return del([
        'scripts.js'
    ]);
});

gulp.task('watch', function () {
    gulp.watch(sassFiles, gulp.series(['clean-css', 'styles']));
    gulp.watch(jsFiles, gulp.series(['clean-js', 'scripts']));
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: "niteowl/"
    });

    gulp.watch(sassFiles, gulp.series(['clean-css', 'styles'])).on('change', browserSync.reload);
    gulp.watch(phpFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles, gulp.series(['clean-js', 'scripts'])).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.parallel('clean-css', 'clean-js', 'styles', 'scripts', 'watch', 'serve'));
