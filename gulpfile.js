'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pipeConcat = require('pipe-concat');
const del = require('del');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');


//style paths
const sassFiles = 'assets/scss/*.scss',
    cssDest = './';

gulp.task('styles', function () {
    // const styles = pipeConcat(
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
    // );
    // styles.on('end',() => {
    //     console.log('compile finished!')
    // });
    // return styles;
});

gulp.task('clean', () => {
    return del([
        'style.css'
    ]);
});

gulp.task('watch', function () {
    gulp.watch(sassFiles, gulp.series(['clean', 'styles']));
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: "niteowl/"
    });

    gulp.watch(sassFiles, gulp.series(['clean', 'styles'])).on('change', browserSync.reload);
    gulp.watch('./*.php').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.parallel('clean', 'styles', 'watch', 'serve'));
